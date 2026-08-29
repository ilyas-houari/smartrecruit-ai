package com.smartrecruit.backend.controller;

import com.smartrecruit.backend.dto.request.UpdateCandidateProfileRequest;
import com.smartrecruit.backend.dto.response.CandidateProfileResponse;
import com.smartrecruit.backend.entity.User;
import com.smartrecruit.backend.service.CandidateService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/candidates")
@RequiredArgsConstructor
public class CandidateController {

    private final CandidateService candidateService;

    @GetMapping("/me")
    public ResponseEntity<CandidateProfileResponse> getMyProfile(
            Authentication authentication
    ) {

        User currentUser = (User) authentication.getPrincipal();

        CandidateProfileResponse response =
                candidateService.getMyProfile(currentUser);

        return ResponseEntity.ok(response);
    }

    @PutMapping("/me")
    public ResponseEntity<CandidateProfileResponse> updateMyProfile(
            Authentication authentication,
            @Valid @RequestBody UpdateCandidateProfileRequest request
    ) {

        User currentUser = (User) authentication.getPrincipal();

        CandidateProfileResponse response =
                candidateService.updateMyProfile(
                        currentUser,
                        request
                );

        return ResponseEntity.ok(response);
    }
}