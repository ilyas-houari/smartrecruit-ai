package com.smartrecruit.backend.dto.response;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class RecruiterProfileResponse {

    private Long id;
    private Long userId;

    private Long companyId;
    private String companyName;

    private String position;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}