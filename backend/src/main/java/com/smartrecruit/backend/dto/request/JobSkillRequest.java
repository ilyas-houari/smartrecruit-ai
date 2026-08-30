package com.smartrecruit.backend.dto.request;

import com.smartrecruit.backend.enums.SkillLevel;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class JobSkillRequest {

    @NotNull
    private Long skillId;

    private SkillLevel requiredLevel;

    @NotNull
    private Boolean mandatory;

    @DecimalMin(value = "0.0")
    @DecimalMax(value = "100.0")
    private BigDecimal weight;
}