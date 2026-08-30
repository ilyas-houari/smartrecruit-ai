package com.smartrecruit.backend.dto.response;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.smartrecruit.backend.enums.DataSource;
import com.smartrecruit.backend.enums.SkillLevel;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class CandidateSkillResponse {

    private Long id;
    private Long candidateId;

    private Long skillId;
    private String skillName;
    private String skillCategory;

    private SkillLevel level;
    private DataSource source;
    private BigDecimal confidenceScore;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}