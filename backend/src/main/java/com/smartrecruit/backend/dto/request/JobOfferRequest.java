package com.smartrecruit.backend.dto.request;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.smartrecruit.backend.enums.ContractType;
import com.smartrecruit.backend.enums.EducationLevel;
import com.smartrecruit.backend.enums.WorkMode;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JobOfferRequest {

    @NotBlank
    @Size(max = 200)
    private String title;

    @NotBlank
    @Size(max = 10000)
    private String description;

    @Size(max = 150)
    private String location;

    @NotNull
    private WorkMode workMode;

    @NotNull
    private ContractType contractType;

    @NotNull
    @DecimalMin(value = "0.0")
    private BigDecimal requiredExperienceYears;

    @NotNull
    private EducationLevel requiredEducationLevel;

    @DecimalMin(value = "0.0")
    private BigDecimal salaryMin;

    @DecimalMin(value = "0.0")
    private BigDecimal salaryMax;

    private LocalDate deadline;
}