package com.smartrecruit.backend.service;

import com.smartrecruit.backend.dto.request.JobSkillRequest;
import com.smartrecruit.backend.dto.response.JobSkillResponse;
import com.smartrecruit.backend.entity.JobOffer;
import com.smartrecruit.backend.entity.JobSkill;
import com.smartrecruit.backend.entity.Recruiter;
import com.smartrecruit.backend.entity.Skill;
import com.smartrecruit.backend.entity.User;
import com.smartrecruit.backend.enums.RoleName;
import com.smartrecruit.backend.repository.JobOfferRepository;
import com.smartrecruit.backend.repository.JobSkillRepository;
import com.smartrecruit.backend.repository.RecruiterRepository;
import com.smartrecruit.backend.repository.SkillRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class JobSkillService {

    private final JobSkillRepository jobSkillRepository;
    private final JobOfferRepository jobOfferRepository;
    private final RecruiterRepository recruiterRepository;
    private final SkillRepository skillRepository;

    public JobSkillResponse addJobSkill(
            User currentUser,
            Long jobOfferId,
            JobSkillRequest request
    ) {
        JobOffer jobOffer = getOwnedJobOffer(currentUser, jobOfferId);

        Skill skill = skillRepository.findById(request.getSkillId())
                .orElseThrow(() ->
                        new RuntimeException("Skill not found")
                );

        jobSkillRepository
                .findByJobOfferIdAndSkillId(jobOfferId, skill.getId())
                .ifPresent(existing -> {
                    throw new RuntimeException(
                            "This skill already exists in this job offer"
                    );
                });

        JobSkill jobSkill = JobSkill.builder()
                .jobOffer(jobOffer)
                .skill(skill)
                .requiredLevel(request.getRequiredLevel())
                .mandatory(request.getMandatory())
                .weight(request.getWeight())
                .build();

        JobSkill savedJobSkill =
                jobSkillRepository.saveAndFlush(jobSkill);

        return toResponse(savedJobSkill);
    }

    @Transactional(readOnly = true)
    public List<JobSkillResponse> getJobSkills(
            User currentUser,
            Long jobOfferId
    ) {
        getOwnedJobOffer(currentUser, jobOfferId);

        return jobSkillRepository
                .findByJobOfferId(jobOfferId)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public JobSkillResponse updateJobSkill(
            User currentUser,
            Long jobOfferId,
            Long jobSkillId,
            JobSkillRequest request
    ) {
        JobOffer jobOffer = getOwnedJobOffer(currentUser, jobOfferId);

        JobSkill jobSkill = jobSkillRepository.findById(jobSkillId)
                .orElseThrow(() ->
                        new RuntimeException("Job skill not found")
                );

        if (!jobSkill.getJobOffer().getId().equals(jobOffer.getId())) {
            throw new RuntimeException(
                    "This job skill does not belong to this job offer"
            );
        }

        Skill skill = skillRepository.findById(request.getSkillId())
                .orElseThrow(() ->
                        new RuntimeException("Skill not found")
                );

        jobSkillRepository
                .findByJobOfferIdAndSkillId(jobOfferId, skill.getId())
                .ifPresent(existing -> {
                    if (!existing.getId().equals(jobSkillId)) {
                        throw new RuntimeException(
                                "This skill already exists in this job offer"
                        );
                    }
                });

        jobSkill.setSkill(skill);
        jobSkill.setRequiredLevel(request.getRequiredLevel());
        jobSkill.setMandatory(request.getMandatory());
        jobSkill.setWeight(request.getWeight());

        JobSkill updatedJobSkill =
                jobSkillRepository.saveAndFlush(jobSkill);

        return toResponse(updatedJobSkill);
    }

    public void deleteJobSkill(
            User currentUser,
            Long jobOfferId,
            Long jobSkillId
    ) {
        JobOffer jobOffer = getOwnedJobOffer(currentUser, jobOfferId);

        JobSkill jobSkill = jobSkillRepository.findById(jobSkillId)
                .orElseThrow(() ->
                        new RuntimeException("Job skill not found")
                );

        if (!jobSkill.getJobOffer().getId().equals(jobOffer.getId())) {
            throw new RuntimeException(
                    "This job skill does not belong to this job offer"
            );
        }

        jobSkillRepository.delete(jobSkill);
    }

    private JobOffer getOwnedJobOffer(
            User currentUser,
            Long jobOfferId
    ) {
        Recruiter recruiter = getCurrentRecruiter(currentUser);

        JobOffer jobOffer = jobOfferRepository.findById(jobOfferId)
                .orElseThrow(() ->
                        new RuntimeException("Job offer not found")
                );

        if (!jobOffer.getRecruiter().getId().equals(recruiter.getId())) {
            throw new RuntimeException(
                    "You are not allowed to manage this job offer"
            );
        }

        return jobOffer;
    }

    private Recruiter getCurrentRecruiter(User currentUser) {
        if (currentUser.getRole() != RoleName.RECRUITER) {
            throw new RuntimeException(
                    "Only recruiters can manage job skills"
            );
        }

        return recruiterRepository.findByUserId(currentUser.getId())
                .orElseThrow(() ->
                        new RuntimeException("Recruiter profile not found")
                );
    }

    private JobSkillResponse toResponse(JobSkill jobSkill) {
        return JobSkillResponse.builder()
                .id(jobSkill.getId())
                .jobOfferId(jobSkill.getJobOffer().getId())
                .skillId(jobSkill.getSkill().getId())
                .skillName(jobSkill.getSkill().getName())
                .skillCategory(jobSkill.getSkill().getCategory())
                .requiredLevel(jobSkill.getRequiredLevel())
                .mandatory(jobSkill.getMandatory())
                .weight(jobSkill.getWeight())
                .createdAt(jobSkill.getCreatedAt())
                .build();
    }
}