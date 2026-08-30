package com.smartrecruit.backend.dto.request;

import com.smartrecruit.backend.enums.EducationLevel;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EducationRequest {

    @NotBlank
    @Size(max = 200)
    private String degree;

    @Size(max = 200)
    private String field;

    @Size(max = 200)
    private String institution;

    @Min(1950)
    @Max(2100)
    private Integer startYear;

    @Min(1950)
    @Max(2100)
    private Integer endYear;

    @NotNull
    private EducationLevel level;
}