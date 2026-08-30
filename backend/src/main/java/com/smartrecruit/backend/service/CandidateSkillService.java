package com.smartrecruit.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.smartrecruit.backend.dto.request.CandidateSkillRequest;
import com.smartrecruit.backend.dto.response.CandidateSkillResponse;
import com.smartrecruit.backend.entity.Candidate;
import com.smartrecruit.backend.entity.CandidateSkill;
import com.smartrecruit.backend.entity.Skill;
import com.smartrecruit.backend.entity.User;
import com.smartrecruit.backend.enums.DataSource;
import com.smartrecruit.backend.enums.RoleName;
import com.smartrecruit.backend.exception.BadRequestException;
import com.smartrecruit.backend.exception.ForbiddenException;
import com.smartrecruit.backend.exception.ResourceNotFoundException;
import com.smartrecruit.backend.repository.CandidateRepository;
import com.smartrecruit.backend.repository.CandidateSkillRepository;
import com.smartrecruit.backend.repository.SkillRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CandidateSkillService {

    private final CandidateRepository candidateRepository;
    private final CandidateSkillRepository candidateSkillRepository;
    private final SkillRepository skillRepository;

    @Transactional
    public CandidateSkillResponse addSkill(
            User currentUser,
            CandidateSkillRequest request
    ) {
        Candidate candidate = getCurrentCandidate(currentUser);

        Skill skill = skillRepository.findById(request.getSkillId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Skill not found")
                );

        if (candidateSkillRepository.existsByCandidateIdAndSkillId(
                candidate.getId(),
                skill.getId()
        )) {
            throw new BadRequestException(
                    "Candidate already has this skill"
            );
        }

        CandidateSkill candidateSkill = CandidateSkill.builder()
                .candidate(candidate)
                .skill(skill)
                .level(request.getLevel())
                .source(DataSource.MANUAL)
                .confidenceScore(null)
                .build();

        return toResponse(candidateSkillRepository.save(candidateSkill));
    }

    @Transactional(readOnly = true)
    public List<CandidateSkillResponse> getMySkills(User currentUser) {
        Candidate candidate = getCurrentCandidate(currentUser);

        return candidateSkillRepository.findByCandidateId(candidate.getId())
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional
    public CandidateSkillResponse updateSkill(
            User currentUser,
            Long candidateSkillId,
            CandidateSkillRequest request
    ) {
        Candidate candidate = getCurrentCandidate(currentUser);

        CandidateSkill candidateSkill =
                candidateSkillRepository.findById(candidateSkillId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Candidate skill not found"
                                )
                        );

        if (!candidateSkill.getCandidate().getId()
                .equals(candidate.getId())) {
            throw new ForbiddenException(
                    "You cannot modify this skill"
            );
        }

        Skill skill = skillRepository.findById(request.getSkillId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Skill not found")
                );

        if (!candidateSkill.getSkill().getId().equals(skill.getId())
                && candidateSkillRepository.existsByCandidateIdAndSkillId(
                        candidate.getId(),
                        skill.getId()
                )) {
            throw new BadRequestException(
                    "Candidate already has this skill"
            );
        }

        candidateSkill.setSkill(skill);
        candidateSkill.setLevel(request.getLevel());
        candidateSkill.setSource(DataSource.MANUAL);
        candidateSkill.setConfidenceScore(null);

        CandidateSkill updatedSkill =
                candidateSkillRepository.saveAndFlush(candidateSkill);

        return toResponse(updatedSkill);
    }

    @Transactional
    public void deleteSkill(
            User currentUser,
            Long candidateSkillId
    ) {
        Candidate candidate = getCurrentCandidate(currentUser);

        CandidateSkill candidateSkill =
                candidateSkillRepository.findById(candidateSkillId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Candidate skill not found"
                                )
                        );

        if (!candidateSkill.getCandidate().getId()
                .equals(candidate.getId())) {
            throw new ForbiddenException(
                    "You cannot delete this skill"
            );
        }

        candidateSkillRepository.delete(candidateSkill);
    }

    private Candidate getCurrentCandidate(User currentUser) {
        if (currentUser == null
                || currentUser.getRole() != RoleName.CANDIDATE) {
            throw new ForbiddenException(
                    "Candidate access required"
            );
        }

        return candidateRepository.findByUserId(currentUser.getId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Candidate profile not found"
                        )
                );
    }

    private CandidateSkillResponse toResponse(
            CandidateSkill candidateSkill
    ) {
        return CandidateSkillResponse.builder()
                .id(candidateSkill.getId())
                .candidateId(candidateSkill.getCandidate().getId())
                .skillId(candidateSkill.getSkill().getId())
                .skillName(candidateSkill.getSkill().getName())
                .skillCategory(candidateSkill.getSkill().getCategory())
                .level(candidateSkill.getLevel())
                .source(candidateSkill.getSource())
                .confidenceScore(candidateSkill.getConfidenceScore())
                .createdAt(candidateSkill.getCreatedAt())
                .updatedAt(candidateSkill.getUpdatedAt())
                .build();
    }
}