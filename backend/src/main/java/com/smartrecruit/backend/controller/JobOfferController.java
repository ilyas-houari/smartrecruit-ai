package com.smartrecruit.backend.controller;

import com.smartrecruit.backend.dto.request.JobOfferRequest;
import com.smartrecruit.backend.dto.response.JobOfferResponse;
import com.smartrecruit.backend.entity.User;
import com.smartrecruit.backend.service.JobOfferService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/job-offers")
@RequiredArgsConstructor
public class JobOfferController {

    private final JobOfferService jobOfferService;

    @GetMapping("/public")
    public ResponseEntity<List<JobOfferResponse>> getPublishedJobOffers() {
        return ResponseEntity.ok(
                jobOfferService.getPublishedJobOffers()
        );
    }

    @PostMapping
    public ResponseEntity<JobOfferResponse> createJobOffer(
            @AuthenticationPrincipal User currentUser,
            @Valid @RequestBody JobOfferRequest request
    ) {
        JobOfferResponse response =
                jobOfferService.createJobOffer(
                        currentUser,
                        request
                );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @GetMapping("/me")
    public ResponseEntity<List<JobOfferResponse>> getMyJobOffers(
            @AuthenticationPrincipal User currentUser
    ) {
        return ResponseEntity.ok(
                jobOfferService.getMyJobOffers(
                        currentUser
                )
        );
    }

    @GetMapping("/{jobOfferId}")
    public ResponseEntity<JobOfferResponse> getMyJobOffer(
            @AuthenticationPrincipal User currentUser,
            @PathVariable Long jobOfferId
    ) {
        return ResponseEntity.ok(
                jobOfferService.getMyJobOffer(
                        currentUser,
                        jobOfferId
                )
        );
    }

    @PutMapping("/{jobOfferId}")
    public ResponseEntity<JobOfferResponse> updateJobOffer(
            @AuthenticationPrincipal User currentUser,
            @PathVariable Long jobOfferId,
            @Valid @RequestBody JobOfferRequest request
    ) {
        return ResponseEntity.ok(
                jobOfferService.updateJobOffer(
                        currentUser,
                        jobOfferId,
                        request
                )
        );
    }

    @PutMapping("/{jobOfferId}/publish")
    public ResponseEntity<JobOfferResponse> publishJobOffer(
            @AuthenticationPrincipal User currentUser,
            @PathVariable Long jobOfferId
    ) {
        return ResponseEntity.ok(
                jobOfferService.publishJobOffer(
                        currentUser,
                        jobOfferId
                )
        );
    }

    @PutMapping("/{jobOfferId}/close")
    public ResponseEntity<JobOfferResponse> closeJobOffer(
            @AuthenticationPrincipal User currentUser,
            @PathVariable Long jobOfferId
    ) {
        return ResponseEntity.ok(
                jobOfferService.closeJobOffer(
                        currentUser,
                        jobOfferId
                )
        );
    }

    @DeleteMapping("/{jobOfferId}")
    public ResponseEntity<Void> deleteJobOffer(
            @AuthenticationPrincipal User currentUser,
            @PathVariable Long jobOfferId
    ) {
        jobOfferService.deleteJobOffer(
                currentUser,
                jobOfferId
        );

        return ResponseEntity
                .noContent()
                .build();
    }
}