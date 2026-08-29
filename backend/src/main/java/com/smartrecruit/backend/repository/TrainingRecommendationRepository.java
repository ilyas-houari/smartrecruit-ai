package com.smartrecruit.backend.repository;

import com.smartrecruit.backend.entity.TrainingRecommendation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TrainingRecommendationRepository
        extends JpaRepository<TrainingRecommendation, Long> {

    List<TrainingRecommendation> findByCandidateIdOrderByRecommendationScoreDesc(
            Long candidateId
    );

    Optional<TrainingRecommendation> findByCandidateIdAndTrainingId(
            Long candidateId,
            Long trainingId
    );
}