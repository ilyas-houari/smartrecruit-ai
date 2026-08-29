// SkillRepository.java
package com.smartrecruit.backend.repository;

import com.smartrecruit.backend.entity.Skill;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SkillRepository extends JpaRepository<Skill, Long> {

    Optional<Skill> findByNormalizedName(String normalizedName);

    boolean existsByNormalizedName(String normalizedName);

    List<Skill> findByNameContainingIgnoreCase(String name);
}