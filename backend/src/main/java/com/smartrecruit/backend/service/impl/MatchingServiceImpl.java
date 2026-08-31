package com.smartrecruit.backend.service.impl;

import com.smartrecruit.backend.dto.response.MatchingResultResponse;
import com.smartrecruit.backend.entity.Application;
import com.smartrecruit.backend.entity.Candidate;
import com.smartrecruit.backend.entity.CandidateSkill;
import com.smartrecruit.backend.entity.JobOffer;
import com.smartrecruit.backend.entity.JobSkill;
import com.smartrecruit.backend.entity.MatchingResult;
import com.smartrecruit.backend.enums.EducationLevel;
import com.smartrecruit.backend.enums.SkillLevel;
import com.smartrecruit.backend.exception.ResourceNotFoundException;
import com.smartrecruit.backend.repository.ApplicationRepository;
import com.smartrecruit.backend.repository.CandidateSkillRepository;
import com.smartrecruit.backend.repository.JobSkillRepository;
import com.smartrecruit.backend.repository.MatchingResultRepository;
import com.smartrecruit.backend.service.MatchingService;

import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class MatchingServiceImpl implements MatchingService {

    private final ApplicationRepository applicationRepository;
    private final CandidateSkillRepository candidateSkillRepository;
    private final JobSkillRepository jobSkillRepository;
    private final MatchingResultRepository matchingResultRepository;
    private final EntityManager entityManager;

    @Override
    public MatchingResultResponse calculateMatching(Long applicationId) {

        Application application = applicationRepository
                .findById(applicationId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Application not found"
                        )
                );

        Candidate candidate = application.getCandidate();
        JobOffer jobOffer = application.getJobOffer();

        List<CandidateSkill> candidateSkills =
                candidateSkillRepository.findByCandidateId(
                        candidate.getId()
                );

        List<JobSkill> jobSkills =
                jobSkillRepository.findByJobOfferId(
                        jobOffer.getId()
                );

        BigDecimal skillScore =
                calculateSkillScore(
                        candidateSkills,
                        jobSkills
                );

        BigDecimal experienceScore =
                calculateExperienceScore(
                        candidate,
                        jobOffer
                );

        BigDecimal educationScore =
                calculateEducationScore(
                        candidate,
                        jobOffer
                );

        String explanation = buildExplanation(
                skillScore,
                experienceScore,
                educationScore
        );

        MatchingResult result = matchingResultRepository
                .findByApplicationId(applicationId)
                .orElseGet(() ->
                        MatchingResult.builder()
                                .application(application)
                                .build()
                );

        result.setSkillScore(skillScore);
        result.setExperienceScore(experienceScore);
        result.setEducationScore(educationScore);
        result.setExplanation(explanation);
        result.setAlgorithmVersion("v1.0");
        result.setCalculatedAt(LocalDateTime.now());

        MatchingResult savedResult =
                matchingResultRepository.saveAndFlush(result);

        /*
         * final_score kayt7seb automatiquement f MySQL.
         * refresh kayjib l value generated mn database.
         */
        entityManager.refresh(savedResult);

        return mapToResponse(savedResult);
    }

    @Override
    @Transactional(readOnly = true)
    public MatchingResultResponse getMatchingResult(
            Long applicationId
    ) {

        MatchingResult result = matchingResultRepository
                .findByApplicationId(applicationId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Matching result not found"
                        )
                );

        return mapToResponse(result);
    }

    private BigDecimal calculateSkillScore(
            List<CandidateSkill> candidateSkills,
            List<JobSkill> jobSkills
    ) {

        if (jobSkills == null || jobSkills.isEmpty()) {
            return BigDecimal.valueOf(100)
                    .setScale(2, RoundingMode.HALF_UP);
        }

        Map<Long, CandidateSkill> candidateSkillMap =
                candidateSkills.stream()
                        .collect(
                                Collectors.toMap(
                                        candidateSkill ->
                                                candidateSkill
                                                        .getSkill()
                                                        .getId(),
                                        Function.identity(),
                                        (first, second) -> first
                                )
                        );

        BigDecimal totalWeight = BigDecimal.ZERO;
        BigDecimal earnedWeight = BigDecimal.ZERO;

        for (JobSkill jobSkill : jobSkills) {

            BigDecimal weight =
                    resolveSkillWeight(jobSkill);

            totalWeight = totalWeight.add(weight);

            CandidateSkill candidateSkill =
                    candidateSkillMap.get(
                            jobSkill.getSkill().getId()
                    );

            BigDecimal levelScore =
                    calculateSkillLevelScore(
                            candidateSkill,
                            jobSkill
                    );

            BigDecimal earned =
                    weight
                            .multiply(levelScore)
                            .divide(
                                    BigDecimal.valueOf(100),
                                    4,
                                    RoundingMode.HALF_UP
                            );

            earnedWeight = earnedWeight.add(earned);
        }

        if (totalWeight.compareTo(BigDecimal.ZERO) == 0) {
            return BigDecimal.ZERO
                    .setScale(2, RoundingMode.HALF_UP);
        }

        return earnedWeight
                .multiply(BigDecimal.valueOf(100))
                .divide(
                        totalWeight,
                        2,
                        RoundingMode.HALF_UP
                );
    }

    private BigDecimal resolveSkillWeight(
            JobSkill jobSkill
    ) {

        if (jobSkill.getWeight() == null
                || jobSkill.getWeight()
                        .compareTo(BigDecimal.ZERO) <= 0) {

            return BigDecimal.ONE;
        }

        return jobSkill.getWeight();
    }

    private BigDecimal calculateSkillLevelScore(
            CandidateSkill candidateSkill,
            JobSkill jobSkill
    ) {

        if (candidateSkill == null) {
            return BigDecimal.ZERO;
        }

        SkillLevel requiredLevel =
                jobSkill.getRequiredLevel();

        if (requiredLevel == null) {
            return BigDecimal.valueOf(100);
        }

        SkillLevel candidateLevel =
                candidateSkill.getLevel();

        if (candidateLevel == null) {
            return BigDecimal.valueOf(50);
        }

        int candidateRank =
                getSkillLevelRank(candidateLevel);

        int requiredRank =
                getSkillLevelRank(requiredLevel);

        if (candidateRank >= requiredRank) {
            return BigDecimal.valueOf(100);
        }

        int difference =
                requiredRank - candidateRank;

        return switch (difference) {
            case 1 -> BigDecimal.valueOf(75);
            case 2 -> BigDecimal.valueOf(50);
            case 3 -> BigDecimal.valueOf(25);
            default -> BigDecimal.ZERO;
        };
    }

    private int getSkillLevelRank(
            SkillLevel level
    ) {

        return switch (level) {
            case BEGINNER -> 1;
            case INTERMEDIATE -> 2;
            case ADVANCED -> 3;
            case EXPERT -> 4;
        };
    }

    private BigDecimal calculateExperienceScore(
            Candidate candidate,
            JobOffer jobOffer
    ) {

        BigDecimal requiredYears =
                jobOffer.getRequiredExperienceYears();

        if (requiredYears == null
                || requiredYears.compareTo(BigDecimal.ZERO) <= 0) {

            return BigDecimal.valueOf(100)
                    .setScale(2, RoundingMode.HALF_UP);
        }

        int candidateMonths =
                candidate.getTotalExperienceMonths() == null
                        ? 0
                        : candidate.getTotalExperienceMonths();

        BigDecimal candidateYears =
                BigDecimal.valueOf(candidateMonths)
                        .divide(
                                BigDecimal.valueOf(12),
                                4,
                                RoundingMode.HALF_UP
                        );

        BigDecimal score =
                candidateYears
                        .multiply(BigDecimal.valueOf(100))
                        .divide(
                                requiredYears,
                                2,
                                RoundingMode.HALF_UP
                        );

        if (score.compareTo(
                BigDecimal.valueOf(100)
        ) > 0) {

            return BigDecimal.valueOf(100)
                    .setScale(2, RoundingMode.HALF_UP);
        }

        if (score.compareTo(BigDecimal.ZERO) < 0) {
            return BigDecimal.ZERO
                    .setScale(2, RoundingMode.HALF_UP);
        }

        return score.setScale(
                2,
                RoundingMode.HALF_UP
        );
    }

    private BigDecimal calculateEducationScore(
            Candidate candidate,
            JobOffer jobOffer
    ) {

        EducationLevel requiredLevel =
                jobOffer.getRequiredEducationLevel();

        EducationLevel candidateLevel =
                candidate.getHighestEducationLevel();

        if (requiredLevel == null
                || requiredLevel == EducationLevel.NONE) {

            return BigDecimal.valueOf(100)
                    .setScale(2, RoundingMode.HALF_UP);
        }

        if (candidateLevel == null
                || candidateLevel == EducationLevel.NONE) {

            return BigDecimal.ZERO
                    .setScale(2, RoundingMode.HALF_UP);
        }

        /*
         * OTHER ma n9arnouhach automatiquement
         * b levels academiques.
         */
        if (requiredLevel == EducationLevel.OTHER) {
            return candidateLevel == EducationLevel.OTHER
                    ? BigDecimal.valueOf(100)
                            .setScale(
                                    2,
                                    RoundingMode.HALF_UP
                            )
                    : BigDecimal.ZERO
                            .setScale(
                                    2,
                                    RoundingMode.HALF_UP
                            );
        }

        if (candidateLevel == EducationLevel.OTHER) {
            return BigDecimal.ZERO
                    .setScale(2, RoundingMode.HALF_UP);
        }

        int candidateRank =
                getEducationRank(candidateLevel);

        int requiredRank =
                getEducationRank(requiredLevel);

        if (candidateRank >= requiredRank) {
            return BigDecimal.valueOf(100)
                    .setScale(2, RoundingMode.HALF_UP);
        }

        BigDecimal score =
                BigDecimal.valueOf(candidateRank)
                        .multiply(BigDecimal.valueOf(100))
                        .divide(
                                BigDecimal.valueOf(requiredRank),
                                2,
                                RoundingMode.HALF_UP
                        );

        return score;
    }

    private int getEducationRank(
            EducationLevel level
    ) {

        return switch (level) {
            case NONE -> 0;
            case BAC -> 1;
            case BAC_2 -> 2;
            case BAC_3 -> 3;
            case MASTER -> 4;
            case ENGINEERING -> 4;
            case PHD -> 5;
            case OTHER -> 0;
        };
    }

    private String buildExplanation(
            BigDecimal skillScore,
            BigDecimal experienceScore,
            BigDecimal educationScore
    ) {

        return "Skills: "
                + skillScore
                + "% | Experience: "
                + experienceScore
                + "% | Education: "
                + educationScore
                + "%";
    }

    private MatchingResultResponse mapToResponse(
            MatchingResult result
    ) {

        return MatchingResultResponse.builder()
                .id(result.getId())
                .applicationId(
                        result.getApplication().getId()
                )
                .skillScore(
                        result.getSkillScore()
                )
                .experienceScore(
                        result.getExperienceScore()
                )
                .educationScore(
                        result.getEducationScore()
                )
                .finalScore(
                        result.getFinalScore()
                )
                .explanation(
                        result.getExplanation()
                )
                .algorithmVersion(
                        result.getAlgorithmVersion()
                )
                .calculatedAt(
                        result.getCalculatedAt()
                )
                .updatedAt(
                        result.getUpdatedAt()
                )
                .build();
    }
}