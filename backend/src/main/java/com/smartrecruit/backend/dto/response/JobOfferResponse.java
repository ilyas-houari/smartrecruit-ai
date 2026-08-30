package com.smartrecruit.backend.dto.response;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

import com.smartrecruit.backend.enums.ContractType;
import com.smartrecruit.backend.enums.EducationLevel;
import com.smartrecruit.backend.enums.JobStatus;
import com.smartrecruit.backend.enums.WorkMode;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class JobOfferResponse {

    private Long id;

    private Long recruiterId;
    private Long companyId;
    private String companyName;

    private String title;
    private String description;
    private String location;

    private WorkMode workMode;
    private ContractType contractType;

    private BigDecimal requiredExperienceYears;
    private EducationLevel requiredEducationLevel;

    private BigDecimal salaryMin;
    private BigDecimal salaryMax;

    private JobStatus status;

    private LocalDateTime publishedAt;
    private LocalDate deadline;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}