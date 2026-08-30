package com.smartrecruit.backend.dto.response;

import com.smartrecruit.backend.enums.SkillLevel;
import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Builder
public class JobSkillResponse {

    private Long id;

    private Long jobOfferId;

    private Long skillId;

    private String skillName;

    private String skillCategory;

    private SkillLevel requiredLevel;

    private Boolean mandatory;

    private BigDecimal weight;

    private LocalDateTime createdAt;
}