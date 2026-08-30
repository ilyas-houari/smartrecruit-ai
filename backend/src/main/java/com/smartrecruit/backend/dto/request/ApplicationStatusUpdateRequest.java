package com.smartrecruit.backend.dto.request;

import com.smartrecruit.backend.enums.ApplicationStatus;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ApplicationStatusUpdateRequest {

    @NotNull
    private ApplicationStatus status;
}