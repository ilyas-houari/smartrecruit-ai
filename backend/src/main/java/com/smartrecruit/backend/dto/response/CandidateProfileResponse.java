package com.smartrecruit.backend.dto.response;

import com.smartrecruit.backend.enums.EducationLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class CandidateProfileResponse {

    private Long candidateId;
    private Long userId;

    private String firstName;
    private String lastName;
    private String email;
    private String phone;

    private String city;
    private String country;
    private String bio;

    private String linkedinUrl;
    private String githubUrl;
    private String portfolioUrl;

    private Integer totalExperienceMonths;
    private EducationLevel highestEducationLevel;

    private Boolean profileCompleted;
}