// CVRepository.java
package com.smartrecruit.backend.repository;

import com.smartrecruit.backend.entity.CV;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CVRepository extends JpaRepository<CV, Long> {

    List<CV> findByCandidateIdOrderByUploadedAtDesc(Long candidateId);

    Optional<CV> findByCandidateIdAndIsActiveTrue(Long candidateId);
}