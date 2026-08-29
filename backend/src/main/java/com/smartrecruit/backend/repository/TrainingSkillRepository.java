package com.smartrecruit.backend.repository;

import com.smartrecruit.backend.entity.TrainingSkill;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TrainingSkillRepository extends JpaRepository<TrainingSkill, Long> {

    List<TrainingSkill> findByTrainingId(Long trainingId);

    Optional<TrainingSkill> findByTrainingIdAndSkillId(Long trainingId, Long skillId);
}