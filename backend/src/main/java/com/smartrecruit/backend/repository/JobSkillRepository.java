// JobSkillRepository.java
package com.smartrecruit.backend.repository;

import com.smartrecruit.backend.entity.JobSkill;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface JobSkillRepository extends JpaRepository<JobSkill, Long> {

    List<JobSkill> findByJobOfferId(Long jobOfferId);

    Optional<JobSkill> findByJobOfferIdAndSkillId(Long jobOfferId, Long skillId);
}