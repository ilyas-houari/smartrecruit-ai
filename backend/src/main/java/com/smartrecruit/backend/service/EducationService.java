package com.smartrecruit.backend.service;

import java.time.Year;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.smartrecruit.backend.dto.request.EducationRequest;
import com.smartrecruit.backend.dto.response.EducationResponse;
import com.smartrecruit.backend.entity.Candidate;
import com.smartrecruit.backend.entity.Education;
import com.smartrecruit.backend.entity.User;
import com.smartrecruit.backend.enums.DataSource;
import com.smartrecruit.backend.enums.RoleName;
import com.smartrecruit.backend.exception.BadRequestException;
import com.smartrecruit.backend.exception.ForbiddenException;
import com.smartrecruit.backend.exception.ResourceNotFoundException;
import com.smartrecruit.backend.repository.CandidateRepository;
import com.smartrecruit.backend.repository.EducationRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EducationService {

    private final CandidateRepository candidateRepository;
    private final EducationRepository educationRepository;

    @Transactional
    public EducationResponse createEducation(User currentUser, EducationRequest request) {
        Candidate candidate = getCurrentCandidate(currentUser);

        validateYears(request);

        Education education = Education.builder()
                .candidate(candidate)
                .degree(request.getDegree().trim())
                .field(clean(request.getField()))
                .institution(clean(request.getInstitution()))
                .startYear(request.getStartYear())
                .endYear(request.getEndYear())
                .level(request.getLevel())
                .source(DataSource.MANUAL)
                .build();

        return toResponse(educationRepository.save(education));
    }

    @Transactional(readOnly = true)
    public List<EducationResponse> getMyEducations(User currentUser) {
        Candidate candidate = getCurrentCandidate(currentUser);

        return educationRepository.findByCandidateId(candidate.getId())
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional
    public EducationResponse updateEducation(
            User currentUser,
            Long educationId,
            EducationRequest request
    ) {
        Candidate candidate = getCurrentCandidate(currentUser);

        Education education = educationRepository.findById(educationId)
                .orElseThrow(() -> new ResourceNotFoundException("Education not found"));

        if (!education.getCandidate().getId().equals(candidate.getId())) {
            throw new ForbiddenException("You cannot modify this education");
        }

        validateYears(request);

        education.setDegree(request.getDegree().trim());
        education.setField(clean(request.getField()));
        education.setInstitution(clean(request.getInstitution()));
        education.setStartYear(request.getStartYear());
        education.setEndYear(request.getEndYear());
        education.setLevel(request.getLevel());
        education.setSource(DataSource.MANUAL);

        Education updatedEducation = educationRepository.saveAndFlush(education);

        return toResponse(updatedEducation);
    }

    @Transactional
    public void deleteEducation(User currentUser, Long educationId) {
        Candidate candidate = getCurrentCandidate(currentUser);

        Education education = educationRepository.findById(educationId)
                .orElseThrow(() -> new ResourceNotFoundException("Education not found"));

        if (!education.getCandidate().getId().equals(candidate.getId())) {
            throw new ForbiddenException("You cannot delete this education");
        }

        educationRepository.delete(education);
    }

    private Candidate getCurrentCandidate(User currentUser) {
        if (currentUser == null || currentUser.getRole() != RoleName.CANDIDATE) {
            throw new ForbiddenException("Candidate access required");
        }

        return candidateRepository.findByUserId(currentUser.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Candidate profile not found"));
    }

    private void validateYears(EducationRequest request) {
        Integer startYear = request.getStartYear();
        Integer endYear = request.getEndYear();

        int currentYear = Year.now().getValue();

        if (startYear != null && startYear > currentYear + 1) {
            throw new BadRequestException("Start year cannot be too far in the future");
        }

        if (endYear != null && endYear > currentYear + 20) {
            throw new BadRequestException("End year is invalid");
        }

        if (startYear != null && endYear != null && endYear < startYear) {
            throw new BadRequestException("End year cannot be before start year");
        }
    }

    private String clean(String value) {
        if (value == null) {
            return null;
        }

        String cleaned = value.trim();

        return cleaned.isEmpty() ? null : cleaned;
    }

    private EducationResponse toResponse(Education education) {
        return EducationResponse.builder()
                .id(education.getId())
                .candidateId(education.getCandidate().getId())
                .degree(education.getDegree())
                .field(education.getField())
                .institution(education.getInstitution())
                .startYear(education.getStartYear())
                .endYear(education.getEndYear())
                .level(education.getLevel())
                .source(education.getSource())
                .createdAt(education.getCreatedAt())
                .updatedAt(education.getUpdatedAt())
                .build();
    }
}