package com.smartrecruit.backend.repository;

import com.smartrecruit.backend.entity.MissingSkill;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MissingSkillRepository extends JpaRepository<MissingSkill, Long> {

    List<MissingSkill> findByMatchingResultId(Long matchingResultId);
}