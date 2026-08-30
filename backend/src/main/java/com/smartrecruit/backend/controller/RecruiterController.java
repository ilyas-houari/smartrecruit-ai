package com.smartrecruit.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smartrecruit.backend.dto.request.RecruiterProfileRequest;
import com.smartrecruit.backend.dto.response.RecruiterProfileResponse;
import com.smartrecruit.backend.entity.User;
import com.smartrecruit.backend.service.RecruiterService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/recruiters")
@RequiredArgsConstructor
public class RecruiterController {

    private final RecruiterService recruiterService;

    @GetMapping("/me")
    public ResponseEntity<RecruiterProfileResponse> getMyProfile(
            @AuthenticationPrincipal User currentUser
    ) {
        return ResponseEntity.ok(
                recruiterService.getMyProfile(currentUser)
        );
    }

    @PutMapping("/me")
    public ResponseEntity<RecruiterProfileResponse> updateMyProfile(
            @AuthenticationPrincipal User currentUser,
            @Valid @RequestBody RecruiterProfileRequest request
    ) {
        return ResponseEntity.ok(
                recruiterService.updateMyProfile(currentUser, request)
        );
    }
}