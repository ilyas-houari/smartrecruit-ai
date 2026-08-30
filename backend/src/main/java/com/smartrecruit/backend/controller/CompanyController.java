package com.smartrecruit.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smartrecruit.backend.dto.request.CompanyRequest;
import com.smartrecruit.backend.dto.response.CompanyResponse;
import com.smartrecruit.backend.entity.User;
import com.smartrecruit.backend.service.CompanyService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/companies")
@RequiredArgsConstructor
public class CompanyController {

    private final CompanyService companyService;

    @PostMapping
    public ResponseEntity<CompanyResponse> createCompany(
            @AuthenticationPrincipal User currentUser,
            @Valid @RequestBody CompanyRequest request
    ) {
        CompanyResponse response =
                companyService.createCompany(currentUser, request);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/me")
    public ResponseEntity<CompanyResponse> getMyCompany(
            @AuthenticationPrincipal User currentUser
    ) {
        return ResponseEntity.ok(
                companyService.getMyCompany(currentUser)
        );
    }

    @PutMapping("/me")
    public ResponseEntity<CompanyResponse> updateMyCompany(
            @AuthenticationPrincipal User currentUser,
            @Valid @RequestBody CompanyRequest request
    ) {
        return ResponseEntity.ok(
                companyService.updateMyCompany(currentUser, request)
        );
    }
}