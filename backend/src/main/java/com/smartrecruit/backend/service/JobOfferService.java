package com.smartrecruit.backend.service;

import com.smartrecruit.backend.dto.request.JobOfferRequest;
import com.smartrecruit.backend.dto.response.JobOfferResponse;
import com.smartrecruit.backend.entity.Company;
import com.smartrecruit.backend.entity.JobOffer;
import com.smartrecruit.backend.entity.Recruiter;
import com.smartrecruit.backend.entity.User;
import com.smartrecruit.backend.enums.JobStatus;
import com.smartrecruit.backend.enums.RoleName;
import com.smartrecruit.backend.exception.BadRequestException;
import com.smartrecruit.backend.exception.ForbiddenException;
import com.smartrecruit.backend.exception.ResourceNotFoundException;
import com.smartrecruit.backend.repository.JobOfferRepository;
import com.smartrecruit.backend.repository.JobSkillRepository;
import com.smartrecruit.backend.repository.RecruiterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class JobOfferService {

    private final JobOfferRepository jobOfferRepository;
    private final RecruiterRepository recruiterRepository;
    private final JobSkillRepository jobSkillRepository;

    @Transactional
    public JobOfferResponse createJobOffer(
            User currentUser,
            JobOfferRequest request
    ) {
        Recruiter recruiter = getCurrentRecruiter(currentUser);

        Company company = recruiter.getCompany();

        if (company == null) {
            throw new BadRequestException(
                    "Recruiter must belong to a company before creating a job offer"
            );
        }

        validateRequest(request);

        JobOffer jobOffer = JobOffer.builder()
                .recruiter(recruiter)
                .company(company)
                .title(request.getTitle().trim())
                .description(request.getDescription().trim())
                .location(clean(request.getLocation()))
                .workMode(request.getWorkMode())
                .contractType(request.getContractType())
                .requiredExperienceYears(
                        request.getRequiredExperienceYears()
                )
                .requiredEducationLevel(
                        request.getRequiredEducationLevel()
                )
                .salaryMin(request.getSalaryMin())
                .salaryMax(request.getSalaryMax())
                .status(JobStatus.DRAFT)
                .publishedAt(null)
                .deadline(request.getDeadline())
                .build();

        JobOffer savedJobOffer =
                jobOfferRepository.saveAndFlush(jobOffer);

        return toResponse(savedJobOffer);
    }

    @Transactional(readOnly = true)
    public List<JobOfferResponse> getPublishedJobOffers() {

        return jobOfferRepository
                .findByStatus(JobStatus.PUBLISHED)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<JobOfferResponse> getMyJobOffers(
            User currentUser
    ) {
        Recruiter recruiter = getCurrentRecruiter(currentUser);

        return jobOfferRepository
                .findByRecruiterId(recruiter.getId())
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public JobOfferResponse getMyJobOffer(
            User currentUser,
            Long jobOfferId
    ) {
        Recruiter recruiter = getCurrentRecruiter(currentUser);

        JobOffer jobOffer = getOwnedJobOffer(
                recruiter,
                jobOfferId
        );

        return toResponse(jobOffer);
    }

    @Transactional
    public JobOfferResponse updateJobOffer(
            User currentUser,
            Long jobOfferId,
            JobOfferRequest request
    ) {
        Recruiter recruiter = getCurrentRecruiter(currentUser);

        JobOffer jobOffer = getOwnedJobOffer(
                recruiter,
                jobOfferId
        );

        if (jobOffer.getStatus() != JobStatus.DRAFT) {
            throw new BadRequestException(
                    "Only draft job offers can be edited"
            );
        }

        validateRequest(request);

        jobOffer.setTitle(
                request.getTitle().trim()
        );

        jobOffer.setDescription(
                request.getDescription().trim()
        );

        jobOffer.setLocation(
                clean(request.getLocation())
        );

        jobOffer.setWorkMode(
                request.getWorkMode()
        );

        jobOffer.setContractType(
                request.getContractType()
        );

        jobOffer.setRequiredExperienceYears(
                request.getRequiredExperienceYears()
        );

        jobOffer.setRequiredEducationLevel(
                request.getRequiredEducationLevel()
        );

        jobOffer.setSalaryMin(
                request.getSalaryMin()
        );

        jobOffer.setSalaryMax(
                request.getSalaryMax()
        );

        jobOffer.setDeadline(
                request.getDeadline()
        );

        JobOffer updatedJobOffer =
                jobOfferRepository.saveAndFlush(jobOffer);

        return toResponse(updatedJobOffer);
    }

    @Transactional
    public JobOfferResponse publishJobOffer(
            User currentUser,
            Long jobOfferId
    ) {
        Recruiter recruiter = getCurrentRecruiter(currentUser);

        JobOffer jobOffer = getOwnedJobOffer(
                recruiter,
                jobOfferId
        );

        if (jobOffer.getStatus() != JobStatus.DRAFT) {
            throw new BadRequestException(
                    "Only draft job offers can be published"
            );
        }

        if (jobOffer.getDeadline() != null
                && jobOffer.getDeadline()
                .isBefore(LocalDate.now())) {
            throw new BadRequestException(
                    "Cannot publish a job offer with an expired deadline"
            );
        }

        if (jobSkillRepository
                .findByJobOfferId(jobOfferId)
                .isEmpty()) {
            throw new BadRequestException(
                    "A job offer must have at least one skill before publishing"
            );
        }

        jobOffer.setStatus(
                JobStatus.PUBLISHED
        );

        jobOffer.setPublishedAt(
                LocalDateTime.now()
        );

        JobOffer publishedJobOffer =
                jobOfferRepository.saveAndFlush(jobOffer);

        return toResponse(publishedJobOffer);
    }

    @Transactional
    public JobOfferResponse closeJobOffer(
            User currentUser,
            Long jobOfferId
    ) {
        Recruiter recruiter = getCurrentRecruiter(currentUser);

        JobOffer jobOffer = getOwnedJobOffer(
                recruiter,
                jobOfferId
        );

        if (jobOffer.getStatus() != JobStatus.PUBLISHED) {
            throw new BadRequestException(
                    "Only published job offers can be closed"
            );
        }

        jobOffer.setStatus(
                JobStatus.CLOSED
        );

        JobOffer closedJobOffer =
                jobOfferRepository.saveAndFlush(jobOffer);

        return toResponse(closedJobOffer);
    }

    @Transactional
    public void deleteJobOffer(
            User currentUser,
            Long jobOfferId
    ) {
        Recruiter recruiter = getCurrentRecruiter(currentUser);

        JobOffer jobOffer = getOwnedJobOffer(
                recruiter,
                jobOfferId
        );

        if (jobOffer.getStatus() != JobStatus.DRAFT) {
            throw new BadRequestException(
                    "Only draft job offers can be deleted"
            );
        }

        jobOfferRepository.delete(jobOffer);
    }

    private Recruiter getCurrentRecruiter(
            User currentUser
    ) {
        if (currentUser == null
                || currentUser.getRole() != RoleName.RECRUITER) {
            throw new ForbiddenException(
                    "Recruiter access required"
            );
        }

        return recruiterRepository
                .findByUserId(currentUser.getId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Recruiter profile not found"
                        )
                );
    }

    private JobOffer getOwnedJobOffer(
            Recruiter recruiter,
            Long jobOfferId
    ) {
        JobOffer jobOffer =
                jobOfferRepository.findById(jobOfferId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Job offer not found"
                                )
                        );

        if (!jobOffer.getRecruiter()
                .getId()
                .equals(recruiter.getId())) {
            throw new ForbiddenException(
                    "You cannot manage this job offer"
            );
        }

        return jobOffer;
    }

    private void validateRequest(
            JobOfferRequest request
    ) {
        if (request.getSalaryMin() != null
                && request.getSalaryMax() != null
                && request.getSalaryMax()
                .compareTo(request.getSalaryMin()) < 0) {
            throw new BadRequestException(
                    "Maximum salary cannot be lower than minimum salary"
            );
        }

        if (request.getDeadline() != null
                && request.getDeadline()
                .isBefore(LocalDate.now())) {
            throw new BadRequestException(
                    "Deadline cannot be in the past"
            );
        }
    }

    private String clean(
            String value
    ) {
        if (value == null) {
            return null;
        }

        String cleaned = value.trim();

        return cleaned.isEmpty()
                ? null
                : cleaned;
    }

    private JobOfferResponse toResponse(
            JobOffer jobOffer
    ) {
        return JobOfferResponse.builder()
                .id(jobOffer.getId())
                .recruiterId(
                        jobOffer.getRecruiter().getId()
                )
                .companyId(
                        jobOffer.getCompany().getId()
                )
                .companyName(
                        jobOffer.getCompany().getName()
                )
                .title(
                        jobOffer.getTitle()
                )
                .description(
                        jobOffer.getDescription()
                )
                .location(
                        jobOffer.getLocation()
                )
                .workMode(
                        jobOffer.getWorkMode()
                )
                .contractType(
                        jobOffer.getContractType()
                )
                .requiredExperienceYears(
                        jobOffer.getRequiredExperienceYears()
                )
                .requiredEducationLevel(
                        jobOffer.getRequiredEducationLevel()
                )
                .salaryMin(
                        jobOffer.getSalaryMin()
                )
                .salaryMax(
                        jobOffer.getSalaryMax()
                )
                .status(
                        jobOffer.getStatus()
                )
                .publishedAt(
                        jobOffer.getPublishedAt()
                )
                .deadline(
                        jobOffer.getDeadline()
                )
                .createdAt(
                        jobOffer.getCreatedAt()
                )
                .updatedAt(
                        jobOffer.getUpdatedAt()
                )
                .build();
    }
}