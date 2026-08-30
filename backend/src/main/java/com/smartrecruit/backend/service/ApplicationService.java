package com.smartrecruit.backend.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.smartrecruit.backend.dto.request.ApplicationRequest;
import com.smartrecruit.backend.dto.request.ApplicationStatusUpdateRequest;
import com.smartrecruit.backend.dto.response.ApplicationResponse;
import com.smartrecruit.backend.entity.Application;
import com.smartrecruit.backend.entity.Candidate;
import com.smartrecruit.backend.entity.JobOffer;
import com.smartrecruit.backend.entity.User;
import com.smartrecruit.backend.enums.ApplicationStatus;
import com.smartrecruit.backend.enums.JobStatus;
import com.smartrecruit.backend.enums.RoleName;
import com.smartrecruit.backend.exception.BadRequestException;
import com.smartrecruit.backend.exception.ForbiddenException;
import com.smartrecruit.backend.exception.ResourceNotFoundException;
import com.smartrecruit.backend.repository.ApplicationRepository;
import com.smartrecruit.backend.repository.CandidateRepository;
import com.smartrecruit.backend.repository.JobOfferRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final CandidateRepository candidateRepository;
    private final JobOfferRepository jobOfferRepository;

    @Transactional
    public ApplicationResponse applyToJob(
            User currentUser,
            Long jobOfferId,
            ApplicationRequest request
    ) {
        Candidate candidate = getCurrentCandidate(currentUser);

        JobOffer jobOffer = jobOfferRepository.findById(jobOfferId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Job offer not found"
                        )
                );

        if (jobOffer.getStatus() != JobStatus.PUBLISHED) {
            throw new BadRequestException(
                    "You can only apply to published job offers"
            );
        }

        if (jobOffer.getDeadline() != null
                && jobOffer.getDeadline().isBefore(LocalDate.now())) {
            throw new BadRequestException(
                    "This job offer deadline has expired"
            );
        }

        if (applicationRepository.existsByCandidateIdAndJobOfferId(
                candidate.getId(),
                jobOfferId
        )) {
            throw new BadRequestException(
                    "You have already applied to this job offer"
            );
        }

        Application application = Application.builder()
                .candidate(candidate)
                .jobOffer(jobOffer)
                .status(ApplicationStatus.SUBMITTED)
                .coverLetter(clean(request.getCoverLetter()))
                .build();

        Application savedApplication =
                applicationRepository.saveAndFlush(application);

        return toResponse(savedApplication);
    }

    @Transactional(readOnly = true)
    public List<ApplicationResponse> getMyApplications(
            User currentUser
    ) {
        Candidate candidate = getCurrentCandidate(currentUser);

        return applicationRepository
                .findByCandidateId(candidate.getId())
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional
    public ApplicationResponse withdrawApplication(
            User currentUser,
            Long applicationId
    ) {
        Candidate candidate = getCurrentCandidate(currentUser);

        Application application = applicationRepository
                .findById(applicationId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Application not found"
                        )
                );

        if (!application.getCandidate().getId()
                .equals(candidate.getId())) {
            throw new ForbiddenException(
                    "You cannot withdraw this application"
            );
        }

        ApplicationStatus status = application.getStatus();

        if (status == ApplicationStatus.ACCEPTED
                || status == ApplicationStatus.REJECTED
                || status == ApplicationStatus.WITHDRAWN) {
            throw new BadRequestException(
                    "This application cannot be withdrawn"
            );
        }

        application.setStatus(
                ApplicationStatus.WITHDRAWN
        );

        Application savedApplication =
                applicationRepository.saveAndFlush(application);

        return toResponse(savedApplication);
    }

    @Transactional(readOnly = true)
    public List<ApplicationResponse> getJobApplications(
            User currentUser,
            Long jobOfferId
    ) {
        if (currentUser == null
                || currentUser.getRole() != RoleName.RECRUITER) {
            throw new ForbiddenException(
                    "Recruiter access required"
            );
        }

        JobOffer jobOffer = jobOfferRepository
                .findById(jobOfferId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Job offer not found"
                        )
                );

        if (!jobOffer.getRecruiter().getUser().getId()
                .equals(currentUser.getId())) {
            throw new ForbiddenException(
                    "You cannot access applications for this job offer"
            );
        }

        return applicationRepository
                .findByJobOfferId(jobOfferId)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional
    public ApplicationResponse updateApplicationStatus(
            User currentUser,
            Long applicationId,
            ApplicationStatusUpdateRequest request
    ) {
        if (currentUser == null
                || currentUser.getRole() != RoleName.RECRUITER) {
            throw new ForbiddenException(
                    "Recruiter access required"
            );
        }

        Application application = applicationRepository
                .findById(applicationId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Application not found"
                        )
                );

        JobOffer jobOffer = application.getJobOffer();

        if (!jobOffer.getRecruiter().getUser().getId()
                .equals(currentUser.getId())) {
            throw new ForbiddenException(
                    "You cannot update this application"
            );
        }

        ApplicationStatus currentStatus =
                application.getStatus();

        ApplicationStatus newStatus =
                request.getStatus();

        boolean validTransition =
                (currentStatus == ApplicationStatus.SUBMITTED
                        && (newStatus == ApplicationStatus.UNDER_REVIEW
                        || newStatus == ApplicationStatus.REJECTED))
                ||
                (currentStatus == ApplicationStatus.UNDER_REVIEW
                        && (newStatus == ApplicationStatus.SHORTLISTED
                        || newStatus == ApplicationStatus.REJECTED))
                ||
                (currentStatus == ApplicationStatus.SHORTLISTED
                        && (newStatus == ApplicationStatus.ACCEPTED
                        || newStatus == ApplicationStatus.REJECTED));

        if (!validTransition) {
            throw new BadRequestException(
                    "Invalid application status transition"
            );
        }

        application.setStatus(newStatus);

        if (application.getReviewedAt() == null) {
            application.setReviewedAt(
                    LocalDateTime.now()
            );
        }

        Application savedApplication =
                applicationRepository.saveAndFlush(application);

        return toResponse(savedApplication);
    }

    private Candidate getCurrentCandidate(
            User currentUser
    ) {
        if (currentUser == null
                || currentUser.getRole() != RoleName.CANDIDATE) {
            throw new ForbiddenException(
                    "Candidate access required"
            );
        }

        return candidateRepository
                .findByUserId(currentUser.getId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Candidate profile not found"
                        )
                );
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

    private ApplicationResponse toResponse(
            Application application
    ) {
        JobOffer jobOffer = application.getJobOffer();

        return ApplicationResponse.builder()
                .id(application.getId())
                .candidateId(
                        application.getCandidate().getId()
                )
                .jobOfferId(
                        jobOffer.getId()
                )
                .jobTitle(
                        jobOffer.getTitle()
                )
                .companyId(
                        jobOffer.getCompany().getId()
                )
                .companyName(
                        jobOffer.getCompany().getName()
                )
                .status(
                        application.getStatus()
                )
                .coverLetter(
                        application.getCoverLetter()
                )
                .appliedAt(
                        application.getAppliedAt()
                )
                .reviewedAt(
                        application.getReviewedAt()
                )
                .updatedAt(
                        application.getUpdatedAt()
                )
                .build();
    }
}