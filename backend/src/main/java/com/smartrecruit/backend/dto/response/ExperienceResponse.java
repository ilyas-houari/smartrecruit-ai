package com.smartrecruit.backend.dto.response;

import com.smartrecruit.backend.enums.DataSource;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
public class ExperienceResponse {

    private Long id;
    private Long candidateId;

    private String jobTitle;
    private String companyName;
    private String description;

    private LocalDate startDate;
    private LocalDate endDate;

    private Boolean isCurrent;
    private Integer durationMonths;

    private DataSource source;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}