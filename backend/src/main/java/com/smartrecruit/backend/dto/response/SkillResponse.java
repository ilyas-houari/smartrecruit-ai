package com.smartrecruit.backend.dto.response;

import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SkillResponse {

    private Long id;
    private String name;
    private String normalizedName;
    private String category;
    private LocalDateTime createdAt;
}