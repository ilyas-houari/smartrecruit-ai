package com.smartrecruit.backend.service;

import java.time.LocalDate;
import java.time.Period;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.smartrecruit.backend.dto.request.ExperienceRequest;
import com.smartrecruit.backend.dto.response.ExperienceResponse;
import com.smartrecruit.backend.entity.Candidate;
import com.smartrecruit.backend.entity.Experience;
import com.smartrecruit.backend.entity.User;
import com.smartrecruit.backend.enums.DataSource;
import com.smartrecruit.backend.enums.RoleName;
import com.smartrecruit.backend.exception.BadRequestException;
import com.smartrecruit.backend.exception.ForbiddenException;
import com.smartrecruit.backend.exception.ResourceNotFoundException;
import com.smartrecruit.backend.repository.CandidateRepository;
import com.smartrecruit.backend.repository.ExperienceRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ExperienceService {

    private final CandidateRepository candidateRepository;
    private final ExperienceRepository experienceRepository;

    @Transactional
    public ExperienceResponse createExperience(User currentUser, ExperienceRequest request) {
        Candidate candidate = getCurrentCandidate(currentUser);

        validateDates(request);

        Experience experience = Experience.builder()
                .candidate(candidate)
                .jobTitle(request.getJobTitle().trim())
                .companyName(clean(request.getCompanyName()))
                .description(clean(request.getDescription()))
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .isCurrent(Boolean.TRUE.equals(request.getIsCurrent()))
                .durationMonths(calculateDurationMonths(
                        request.getStartDate(),
                        request.getEndDate(),
                        Boolean.TRUE.equals(request.getIsCurrent())
                ))
                .source(DataSource.MANUAL)
                .build();

        return toResponse(experienceRepository.save(experience));
    }

    @Transactional(readOnly = true)
    public List<ExperienceResponse> getMyExperiences(User currentUser) {
        Candidate candidate = getCurrentCandidate(currentUser);

        return experienceRepository
                .findByCandidateIdOrderByStartDateDesc(candidate.getId())
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional
    public ExperienceResponse updateExperience(
            User currentUser,
            Long experienceId,
            ExperienceRequest request
    ) {
        Candidate candidate = getCurrentCandidate(currentUser);

        Experience experience = experienceRepository.findById(experienceId)
                .orElseThrow(() -> new ResourceNotFoundException("Experience not found"));

        if (!experience.getCandidate().getId().equals(candidate.getId())) {
            throw new ForbiddenException("You cannot modify this experience");
        }

        validateDates(request);

        experience.setJobTitle(request.getJobTitle().trim());
        experience.setCompanyName(clean(request.getCompanyName()));
        experience.setDescription(clean(request.getDescription()));
        experience.setStartDate(request.getStartDate());
        experience.setEndDate(request.getEndDate());
        experience.setIsCurrent(Boolean.TRUE.equals(request.getIsCurrent()));
        experience.setDurationMonths(calculateDurationMonths(
                request.getStartDate(),
                request.getEndDate(),
                Boolean.TRUE.equals(request.getIsCurrent())
        ));
        experience.setSource(DataSource.MANUAL);

        Experience updatedExperience = experienceRepository.saveAndFlush(experience);
        return toResponse(updatedExperience);
    }

    @Transactional
    public void deleteExperience(User currentUser, Long experienceId) {
        Candidate candidate = getCurrentCandidate(currentUser);

        Experience experience = experienceRepository.findById(experienceId)
                .orElseThrow(() -> new ResourceNotFoundException("Experience not found"));

        if (!experience.getCandidate().getId().equals(candidate.getId())) {
            throw new ForbiddenException("You cannot delete this experience");
        }

        experienceRepository.delete(experience);
    }

    private Candidate getCurrentCandidate(User currentUser) {
        if (currentUser == null || currentUser.getRole() != RoleName.CANDIDATE) {
            throw new ForbiddenException("Candidate access required");
        }

        return candidateRepository.findByUserId(currentUser.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Candidate profile not found"));
    }

    private void validateDates(ExperienceRequest request) {
        LocalDate startDate = request.getStartDate();
        LocalDate endDate = request.getEndDate();
        boolean current = Boolean.TRUE.equals(request.getIsCurrent());

        if (startDate == null) {
            throw new BadRequestException("Start date is required");
        }

        if (startDate.isAfter(LocalDate.now())) {
            throw new BadRequestException("Start date cannot be in the future");
        }

        if (current && endDate != null) {
            throw new BadRequestException("Current experience must not have an end date");
        }

        if (!current && endDate == null) {
            throw new BadRequestException("End date is required for a past experience");
        }

        if (endDate != null && endDate.isAfter(LocalDate.now())) {
            throw new BadRequestException("End date cannot be in the future");
        }

        if (endDate != null && endDate.isBefore(startDate)) {
            throw new BadRequestException("End date cannot be before start date");
        }
    }

    private int calculateDurationMonths(LocalDate startDate, LocalDate endDate, boolean current) {
        LocalDate effectiveEndDate = current ? LocalDate.now() : endDate;

        if (startDate == null || effectiveEndDate == null) {
            return 0;
        }

        Period period = Period.between(
                startDate.withDayOfMonth(1),
                effectiveEndDate.withDayOfMonth(1)
        );

        return Math.max(0, period.getYears() * 12 + period.getMonths());
    }

    private String clean(String value) {
        if (value == null) {
            return null;
        }

        String cleaned = value.trim();
        return cleaned.isEmpty() ? null : cleaned;
    }

    private ExperienceResponse toResponse(Experience experience) {
        return ExperienceResponse.builder()
                .id(experience.getId())
                .candidateId(experience.getCandidate().getId())
                .jobTitle(experience.getJobTitle())
                .companyName(experience.getCompanyName())
                .description(experience.getDescription())
                .startDate(experience.getStartDate())
                .endDate(experience.getEndDate())
                .isCurrent(experience.getIsCurrent())
                .durationMonths(experience.getDurationMonths())
                .source(experience.getSource())
                .createdAt(experience.getCreatedAt())
                .updatedAt(experience.getUpdatedAt())
                .build();
    }
}