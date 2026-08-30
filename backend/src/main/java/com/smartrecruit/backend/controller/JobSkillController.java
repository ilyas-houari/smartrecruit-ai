package com.smartrecruit.backend.controller;

import com.smartrecruit.backend.dto.request.JobSkillRequest;
import com.smartrecruit.backend.dto.response.JobSkillResponse;
import com.smartrecruit.backend.entity.User;
import com.smartrecruit.backend.service.JobSkillService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/job-offers/{jobOfferId}/skills")
@RequiredArgsConstructor
public class JobSkillController {

    private final JobSkillService jobSkillService;

    @PostMapping
    public ResponseEntity<JobSkillResponse> addJobSkill(
            @AuthenticationPrincipal User currentUser,
            @PathVariable Long jobOfferId,
            @Valid @RequestBody JobSkillRequest request
    ) {
        JobSkillResponse response =
                jobSkillService.addJobSkill(
                        currentUser,
                        jobOfferId,
                        request
                );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @GetMapping
    public ResponseEntity<List<JobSkillResponse>> getJobSkills(
            @AuthenticationPrincipal User currentUser,
            @PathVariable Long jobOfferId
    ) {
        return ResponseEntity.ok(
                jobSkillService.getJobSkills(
                        currentUser,
                        jobOfferId
                )
        );
    }

    @PutMapping("/{jobSkillId}")
    public ResponseEntity<JobSkillResponse> updateJobSkill(
            @AuthenticationPrincipal User currentUser,
            @PathVariable Long jobOfferId,
            @PathVariable Long jobSkillId,
            @Valid @RequestBody JobSkillRequest request
    ) {
        return ResponseEntity.ok(
                jobSkillService.updateJobSkill(
                        currentUser,
                        jobOfferId,
                        jobSkillId,
                        request
                )
        );
    }

    @DeleteMapping("/{jobSkillId}")
    public ResponseEntity<Void> deleteJobSkill(
            @AuthenticationPrincipal User currentUser,
            @PathVariable Long jobOfferId,
            @PathVariable Long jobSkillId
    ) {
        jobSkillService.deleteJobSkill(
                currentUser,
                jobOfferId,
                jobSkillId
        );

        return ResponseEntity.noContent().build();
    }
}