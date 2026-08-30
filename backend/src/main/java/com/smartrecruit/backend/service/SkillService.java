package com.smartrecruit.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.smartrecruit.backend.dto.request.SkillRequest;
import com.smartrecruit.backend.dto.response.SkillResponse;
import com.smartrecruit.backend.entity.Skill;
import com.smartrecruit.backend.exception.BadRequestException;
import com.smartrecruit.backend.repository.SkillRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SkillService {

    private final SkillRepository skillRepository;

    @Transactional
    public SkillResponse createSkill(
            SkillRequest request
    ) {
        String name = request.getName().trim();
        String normalizedName = normalize(name);

        if (skillRepository.existsByNormalizedName(normalizedName)) {
            throw new BadRequestException(
                    "Skill already exists"
            );
        }

        Skill skill = Skill.builder()
                .name(name)
                .normalizedName(normalizedName)
                .category(clean(request.getCategory()))
                .build();

        Skill savedSkill =
                skillRepository.saveAndFlush(skill);

        return toResponse(savedSkill);
    }

    @Transactional(readOnly = true)
    public List<SkillResponse> getAllSkills() {
        return skillRepository
                .findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<SkillResponse> searchSkills(
            String query
    ) {
        if (query == null || query.trim().isEmpty()) {
            return getAllSkills();
        }

        return skillRepository
                .findByNameContainingIgnoreCase(query.trim())
                .stream()
                .map(this::toResponse)
                .toList();
    }

    private String normalize(
            String value
    ) {
        return value
                .trim()
                .toLowerCase();
    }

    private String clean(
            String value
    ) {
        if (value == null) {
            return null;
        }

        String cleaned = value.trim();

        return cleaned.isEmpty()
                ? null
                : cleaned;
    }

    private SkillResponse toResponse(
            Skill skill
    ) {
        return SkillResponse.builder()
                .id(skill.getId())
                .name(skill.getName())
                .normalizedName(skill.getNormalizedName())
                .category(skill.getCategory())
                .createdAt(skill.getCreatedAt())
                .build();
    }
}