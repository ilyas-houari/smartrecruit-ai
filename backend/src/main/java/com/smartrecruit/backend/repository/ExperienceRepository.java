// ExperienceRepository.java
package com.smartrecruit.backend.repository;

import com.smartrecruit.backend.entity.Experience;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExperienceRepository extends JpaRepository<Experience, Long> {

    List<Experience> findByCandidateIdOrderByStartDateDesc(Long candidateId);
}