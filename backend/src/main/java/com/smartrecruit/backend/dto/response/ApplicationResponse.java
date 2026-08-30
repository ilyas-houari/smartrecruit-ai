package com.smartrecruit.backend.dto.response;

import com.smartrecruit.backend.enums.ApplicationStatus;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class ApplicationResponse {

    private Long id;

    private Long candidateId;

    private Long jobOfferId;

    private String jobTitle;

    private Long companyId;

    private String companyName;

    private ApplicationStatus status;

    private String coverLetter;

    private LocalDateTime appliedAt;

    private LocalDateTime reviewedAt;

    private LocalDateTime updatedAt;
}