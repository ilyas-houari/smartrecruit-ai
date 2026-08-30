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

import com.smartrecruit.backend.dto.request.CandidateSkillRequest;
import com.smartrecruit.backend.dto.response.CandidateSkillResponse;
import com.smartrecruit.backend.entity.User;
import com.smartrecruit.backend.service.CandidateSkillService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/candidate-skills")
@RequiredArgsConstructor
public class CandidateSkillController {

    private final CandidateSkillService candidateSkillService;

    @PostMapping
    public ResponseEntity<CandidateSkillResponse> addSkill(
            @AuthenticationPrincipal User currentUser,
            @Valid @RequestBody CandidateSkillRequest request
    ) {
        CandidateSkillResponse response =
                candidateSkillService.addSkill(currentUser, request);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/me")
    public ResponseEntity<List<CandidateSkillResponse>> getMySkills(
            @AuthenticationPrincipal User currentUser
    ) {
        return ResponseEntity.ok(
                candidateSkillService.getMySkills(currentUser)
        );
    }

    @PutMapping("/{candidateSkillId}")
    public ResponseEntity<CandidateSkillResponse> updateSkill(
            @AuthenticationPrincipal User currentUser,
            @PathVariable Long candidateSkillId,
            @Valid @RequestBody CandidateSkillRequest request
    ) {
        return ResponseEntity.ok(
                candidateSkillService.updateSkill(
                        currentUser,
                        candidateSkillId,
                        request
                )
        );
    }

    @DeleteMapping("/{candidateSkillId}")
    public ResponseEntity<Void> deleteSkill(
            @AuthenticationPrincipal User currentUser,
            @PathVariable Long candidateSkillId
    ) {
        candidateSkillService.deleteSkill(
                currentUser,
                candidateSkillId
        );

        return ResponseEntity.noContent().build();
    }
}