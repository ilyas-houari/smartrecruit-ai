package com.smartrecruit.backend.dto.response;

import java.time.LocalDateTime;

import com.smartrecruit.backend.enums.CompanyStatus;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class CompanyResponse {

    private Long id;

    private String name;
    private String description;
    private String website;
    private String city;
    private String country;
    private String industry;
    private String logoUrl;

    private CompanyStatus status;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}