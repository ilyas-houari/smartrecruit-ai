package com.smartrecruit.backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.smartrecruit.backend.dto.request.SkillRequest;
import com.smartrecruit.backend.dto.response.SkillResponse;
import com.smartrecruit.backend.service.SkillService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/skills")
@RequiredArgsConstructor
public class SkillController {

    private final SkillService skillService;

    @PostMapping
    public ResponseEntity<SkillResponse> createSkill(
            @Valid @RequestBody SkillRequest request
    ) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(skillService.createSkill(request));
    }

    @GetMapping
    public ResponseEntity<List<SkillResponse>> getSkills(
            @RequestParam(required = false) String search
    ) {
        return ResponseEntity.ok(
                skillService.searchSkills(search)
        );
    }
}