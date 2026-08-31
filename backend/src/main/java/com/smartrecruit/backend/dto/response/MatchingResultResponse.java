package com.smartrecruit.backend.dto.response;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MatchingResultResponse {

    private Long id;
    private Long applicationId;

    private BigDecimal skillScore;
    private BigDecimal experienceScore;
    private BigDecimal educationScore;
    private BigDecimal finalScore;

    private String explanation;
    private String algorithmVersion;

    private LocalDateTime calculatedAt;
    private LocalDateTime updatedAt;
}