package com.smartrecruit.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CompanyRequest {

    @NotBlank
    @Size(max = 150)
    private String name;

    @Size(max = 5000)
    private String description;

    @Size(max = 500)
    private String website;

    @Size(max = 100)
    private String city;

    @NotBlank
    @Size(max = 100)
    private String country;

    @Size(max = 150)
    private String industry;

    @Size(max = 500)
    private String logoUrl;
}