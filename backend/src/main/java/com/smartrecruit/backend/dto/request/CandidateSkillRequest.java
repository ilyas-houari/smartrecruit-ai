package com.smartrecruit.backend.dto.request;

import com.smartrecruit.backend.enums.SkillLevel;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CandidateSkillRequest {

    @NotNull
    private Long skillId;

    @NotNull
    private SkillLevel level;
}