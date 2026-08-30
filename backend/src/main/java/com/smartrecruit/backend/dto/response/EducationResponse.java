package com.smartrecruit.backend.dto.response;

import java.time.LocalDateTime;

import com.smartrecruit.backend.enums.DataSource;
import com.smartrecruit.backend.enums.EducationLevel;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class EducationResponse {

    private Long id;
    private Long candidateId;

    private String degree;
    private String field;
    private String institution;

    private Integer startYear;
    private Integer endYear;

    private EducationLevel level;
    private DataSource source;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}