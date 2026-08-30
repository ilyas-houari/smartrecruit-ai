package com.smartrecruit.backend.dto.request;

import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ApplicationRequest {

    @Size(max = 5000)
    private String coverLetter;
}