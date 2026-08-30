package com.smartrecruit.backend.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.smartrecruit.backend.dto.request.RecruiterProfileRequest;
import com.smartrecruit.backend.dto.response.RecruiterProfileResponse;
import com.smartrecruit.backend.entity.Recruiter;
import com.smartrecruit.backend.entity.User;
import com.smartrecruit.backend.enums.RoleName;
import com.smartrecruit.backend.exception.ForbiddenException;
import com.smartrecruit.backend.exception.ResourceNotFoundException;
import com.smartrecruit.backend.repository.RecruiterRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RecruiterService {

    private final RecruiterRepository recruiterRepository;

    @Transactional(readOnly = true)
    public RecruiterProfileResponse getMyProfile(User currentUser) {
        Recruiter recruiter = getCurrentRecruiter(currentUser);

        return toResponse(recruiter);
    }

    @Transactional
    public RecruiterProfileResponse updateMyProfile(
            User currentUser,
            RecruiterProfileRequest request
    ) {
        Recruiter recruiter = getCurrentRecruiter(currentUser);

        recruiter.setPosition(clean(request.getPosition()));

        Recruiter updatedRecruiter =
                recruiterRepository.saveAndFlush(recruiter);

        return toResponse(updatedRecruiter);
    }

    private Recruiter getCurrentRecruiter(User currentUser) {
        if (currentUser == null
                || currentUser.getRole() != RoleName.RECRUITER) {
            throw new ForbiddenException(
                    "Recruiter access required"
            );
        }

        return recruiterRepository.findByUserId(currentUser.getId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Recruiter profile not found"
                        )
                );
    }

    private String clean(String value) {
        if (value == null) {
            return null;
        }

        String cleaned = value.trim();

        return cleaned.isEmpty() ? null : cleaned;
    }

    private RecruiterProfileResponse toResponse(Recruiter recruiter) {
        return RecruiterProfileResponse.builder()
                .id(recruiter.getId())
                .userId(recruiter.getUser().getId())
                .companyId(
                        recruiter.getCompany() != null
                                ? recruiter.getCompany().getId()
                                : null
                )
                .companyName(
                        recruiter.getCompany() != null
                                ? recruiter.getCompany().getName()
                                : null
                )
                .position(recruiter.getPosition())
                .createdAt(recruiter.getCreatedAt())
                .updatedAt(recruiter.getUpdatedAt())
                .build();
    }
}