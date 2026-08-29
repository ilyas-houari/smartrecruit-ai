package com.smartrecruit.backend.controller;

import com.smartrecruit.backend.dto.response.CVResponse;
import com.smartrecruit.backend.entity.User;
import com.smartrecruit.backend.service.CVService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/cvs")
@RequiredArgsConstructor
public class CVController {

    private final CVService cvService;

    @PostMapping("/upload")
    public ResponseEntity<CVResponse> uploadCV(
            Authentication authentication,
            @RequestParam("file") MultipartFile file
    ) {

        User currentUser =
                (User) authentication.getPrincipal();

        CVResponse response =
                cvService.uploadCV(currentUser, file);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @GetMapping("/me")
    public ResponseEntity<List<CVResponse>> getMyCVs(
            Authentication authentication
    ) {

        User currentUser =
                (User) authentication.getPrincipal();

        return ResponseEntity.ok(
                cvService.getMyCVs(currentUser)
        );
    }

    @GetMapping("/me/active")
    public ResponseEntity<CVResponse> getActiveCV(
            Authentication authentication
    ) {

        User currentUser =
                (User) authentication.getPrincipal();

        return ResponseEntity.ok(
                cvService.getActiveCV(currentUser)
        );
    }
}