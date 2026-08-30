package com.smartrecruit.backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.smartrecruit.backend.dto.request.ApplicationRequest;
import com.smartrecruit.backend.dto.request.ApplicationStatusUpdateRequest;
import com.smartrecruit.backend.dto.response.ApplicationResponse;
import com.smartrecruit.backend.entity.User;
import com.smartrecruit.backend.service.ApplicationService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class ApplicationController {

    private final ApplicationService applicationService;

    @PostMapping("/api/job-offers/{jobOfferId}/applications")
    public ResponseEntity<ApplicationResponse> applyToJob(
            @AuthenticationPrincipal User currentUser,
            @PathVariable Long jobOfferId,
            @Valid @RequestBody ApplicationRequest request
    ) {
        ApplicationResponse response =
                applicationService.applyToJob(
                        currentUser,
                        jobOfferId,
                        request
                );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @GetMapping("/api/applications/me")
    public ResponseEntity<List<ApplicationResponse>> getMyApplications(
            @AuthenticationPrincipal User currentUser
    ) {
        return ResponseEntity.ok(
                applicationService.getMyApplications(currentUser)
        );
    }

    @PutMapping("/api/applications/{applicationId}/withdraw")
    public ResponseEntity<ApplicationResponse> withdrawApplication(
            @AuthenticationPrincipal User currentUser,
            @PathVariable Long applicationId
    ) {
        return ResponseEntity.ok(
                applicationService.withdrawApplication(
                        currentUser,
                        applicationId
                )
        );
    }

    @GetMapping("/api/job-offers/{jobOfferId}/applications")
    public ResponseEntity<List<ApplicationResponse>> getJobApplications(
            @AuthenticationPrincipal User currentUser,
            @PathVariable Long jobOfferId
    ) {
        return ResponseEntity.ok(
                applicationService.getJobApplications(
                        currentUser,
                        jobOfferId
                )
        );
    }

    @PutMapping("/api/applications/{applicationId}/status")
    public ResponseEntity<ApplicationResponse> updateApplicationStatus(
            @AuthenticationPrincipal User currentUser,
            @PathVariable Long applicationId,
            @Valid @RequestBody ApplicationStatusUpdateRequest request
    ) {
        return ResponseEntity.ok(
                applicationService.updateApplicationStatus(
                        currentUser,
                        applicationId,
                        request
                )
        );
    }
}