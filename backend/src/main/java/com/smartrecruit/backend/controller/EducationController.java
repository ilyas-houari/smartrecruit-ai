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

import com.smartrecruit.backend.dto.request.EducationRequest;
import com.smartrecruit.backend.dto.response.EducationResponse;
import com.smartrecruit.backend.entity.User;
import com.smartrecruit.backend.service.EducationService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/educations")
@RequiredArgsConstructor
public class EducationController {

    private final EducationService educationService;

    @PostMapping
    public ResponseEntity<EducationResponse> createEducation(
            @AuthenticationPrincipal User currentUser,
            @Valid @RequestBody EducationRequest request
    ) {
        EducationResponse response =
                educationService.createEducation(currentUser, request);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/me")
    public ResponseEntity<List<EducationResponse>> getMyEducations(
            @AuthenticationPrincipal User currentUser
    ) {
        return ResponseEntity.ok(
                educationService.getMyEducations(currentUser)
        );
    }

    @PutMapping("/{educationId}")
    public ResponseEntity<EducationResponse> updateEducation(
            @AuthenticationPrincipal User currentUser,
            @PathVariable Long educationId,
            @Valid @RequestBody EducationRequest request
    ) {
        return ResponseEntity.ok(
                educationService.updateEducation(
                        currentUser,
                        educationId,
                        request
                )
        );
    }

    @DeleteMapping("/{educationId}")
    public ResponseEntity<Void> deleteEducation(
            @AuthenticationPrincipal User currentUser,
            @PathVariable Long educationId
    ) {
        educationService.deleteEducation(currentUser, educationId);

        return ResponseEntity.noContent().build();
    }
}