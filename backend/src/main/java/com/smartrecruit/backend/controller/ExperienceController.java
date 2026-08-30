package com.smartrecruit.backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smartrecruit.backend.dto.request.ExperienceRequest;
import com.smartrecruit.backend.dto.response.ExperienceResponse;
import com.smartrecruit.backend.entity.User;
import com.smartrecruit.backend.service.ExperienceService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/experiences")
@RequiredArgsConstructor
public class ExperienceController {

    private final ExperienceService experienceService;

    @PostMapping
    public ResponseEntity<ExperienceResponse> createExperience(
            @AuthenticationPrincipal User currentUser,
            @Valid @RequestBody ExperienceRequest request
    ) {
        ExperienceResponse response =
                experienceService.createExperience(currentUser, request);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/me")
    public ResponseEntity<List<ExperienceResponse>> getMyExperiences(
            @AuthenticationPrincipal User currentUser
    ) {
        return ResponseEntity.ok(
                experienceService.getMyExperiences(currentUser)
        );
    }

    @PutMapping("/{experienceId}")
    public ResponseEntity<ExperienceResponse> updateExperience(
            @AuthenticationPrincipal User currentUser,
            @PathVariable Long experienceId,
            @Valid @RequestBody ExperienceRequest request
    ) {
        return ResponseEntity.ok(
                experienceService.updateExperience(
                        currentUser,
                        experienceId,
                        request
                )
        );
    }

    @DeleteMapping("/{experienceId}")
    public ResponseEntity<Void> deleteExperience(
            @AuthenticationPrincipal User currentUser,
            @PathVariable Long experienceId
    ) {
        experienceService.deleteExperience(currentUser, experienceId);

        return ResponseEntity.noContent().build();
    }
}