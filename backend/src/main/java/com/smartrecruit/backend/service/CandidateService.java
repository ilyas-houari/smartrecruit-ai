package com.smartrecruit.backend.service;

import com.smartrecruit.backend.dto.request.UpdateCandidateProfileRequest;
import com.smartrecruit.backend.dto.response.CandidateProfileResponse;
import com.smartrecruit.backend.entity.Candidate;
import com.smartrecruit.backend.entity.User;
import com.smartrecruit.backend.enums.RoleName;
import com.smartrecruit.backend.exception.ForbiddenException;
import com.smartrecruit.backend.exception.ResourceNotFoundException;
import com.smartrecruit.backend.repository.CandidateRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CandidateService {

    private final CandidateRepository candidateRepository;

    @Transactional(readOnly = true)
    public CandidateProfileResponse getMyProfile(User currentUser) {

        Candidate candidate = getCandidateForUser(currentUser);

        return buildResponse(candidate);
    }

    @Transactional
    public CandidateProfileResponse updateMyProfile(
            User currentUser,
            UpdateCandidateProfileRequest request
    ) {

        Candidate candidate = getCandidateForUser(currentUser);

        if (request.getCity() != null) {
            candidate.setCity(cleanOptionalText(request.getCity()));
        }

        if (request.getCountry() != null) {
            candidate.setCountry(cleanOptionalText(request.getCountry()));
        }

        if (request.getBio() != null) {
            candidate.setBio(cleanOptionalText(request.getBio()));
        }

        if (request.getLinkedinUrl() != null) {
            candidate.setLinkedinUrl(
                    cleanOptionalText(request.getLinkedinUrl())
            );
        }

        if (request.getGithubUrl() != null) {
            candidate.setGithubUrl(
                    cleanOptionalText(request.getGithubUrl())
            );
        }

        if (request.getPortfolioUrl() != null) {
            candidate.setPortfolioUrl(
                    cleanOptionalText(request.getPortfolioUrl())
            );
        }

        if (request.getTotalExperienceMonths() != null) {
            candidate.setTotalExperienceMonths(
                    request.getTotalExperienceMonths()
            );
        }

        if (request.getHighestEducationLevel() != null) {
            candidate.setHighestEducationLevel(
                    request.getHighestEducationLevel()
            );
        }

        updateProfileCompleted(candidate);

        Candidate savedCandidate =
                candidateRepository.save(candidate);

        return buildResponse(savedCandidate);
    }

    private Candidate getCandidateForUser(User user) {

        if (user == null || user.getRole() != RoleName.CANDIDATE) {
            throw new ForbiddenException(
                    "Only candidates can access this resource"
            );
        }

        return candidateRepository.findByUserId(user.getId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Candidate profile not found"
                        )
                );
    }

    private CandidateProfileResponse buildResponse(
            Candidate candidate
    ) {

        User user = candidate.getUser();

        return CandidateProfileResponse.builder()
                .candidateId(candidate.getId())
                .userId(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .city(candidate.getCity())
                .country(candidate.getCountry())
                .bio(candidate.getBio())
                .linkedinUrl(candidate.getLinkedinUrl())
                .githubUrl(candidate.getGithubUrl())
                .portfolioUrl(candidate.getPortfolioUrl())
                .totalExperienceMonths(
                        candidate.getTotalExperienceMonths()
                )
                .highestEducationLevel(
                        candidate.getHighestEducationLevel()
                )
                .profileCompleted(
                        candidate.getProfileCompleted()
                )
                .build();
    }

    private void updateProfileCompleted(Candidate candidate) {

        boolean completed =
                candidate.getCity() != null
                && !candidate.getCity().isBlank()
                && candidate.getCountry() != null
                && !candidate.getCountry().isBlank()
                && candidate.getBio() != null
                && !candidate.getBio().isBlank();

        candidate.setProfileCompleted(completed);
    }

    private String cleanOptionalText(String value) {

        if (value == null || value.isBlank()) {
            return null;
        }

        return value.trim();
    }
}