// CandidateSkillRepository.java
package com.smartrecruit.backend.repository;

import com.smartrecruit.backend.entity.CandidateSkill;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CandidateSkillRepository extends JpaRepository<CandidateSkill, Long> {

    List<CandidateSkill> findByCandidateId(Long candidateId);

    Optional<CandidateSkill> findByCandidateIdAndSkillId(Long candidateId, Long skillId);

    boolean existsByCandidateIdAndSkillId(Long candidateId, Long skillId);
}