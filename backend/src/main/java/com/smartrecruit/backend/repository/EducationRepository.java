// EducationRepository.java
package com.smartrecruit.backend.repository;

import com.smartrecruit.backend.entity.Education;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EducationRepository extends JpaRepository<Education, Long> {

    List<Education> findByCandidateId(Long candidateId);
}