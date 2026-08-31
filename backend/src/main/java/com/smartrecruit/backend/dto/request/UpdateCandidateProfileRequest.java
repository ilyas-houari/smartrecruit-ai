package com.smartrecruit.backend.dto.request;

import com.smartrecruit.backend.enums.EducationLevel;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateCandidateProfileRequest {

    @Size(max = 30)
    private String phone;

    @Size(max = 100)
    private String city;

    @Size(max = 100)
    private String country;

    @Size(max = 5000)
    private String bio;

    @Size(max = 500)
    private String linkedinUrl;

    @Size(max = 500)
    private String githubUrl;

    @Size(max = 500)
    private String portfolioUrl;

    @Min(0)
    private Integer totalExperienceMonths;

    private EducationLevel highestEducationLevel;
}