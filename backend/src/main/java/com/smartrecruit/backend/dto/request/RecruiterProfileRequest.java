package com.smartrecruit.backend.dto.request;

import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RecruiterProfileRequest {

    @Size(max = 150)
    private String position;
}