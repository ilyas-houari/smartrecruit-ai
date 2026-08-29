package com.smartrecruit.backend.repository;

import com.smartrecruit.backend.entity.JobRecommendation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface JobRecommendationRepository extends JpaRepository<JobRecommendation, Long> {

    List<JobRecommendation> findByCandidateIdOrderByRecommendationScoreDesc(Long candidateId);

    Optional<JobRecommendation> findByCandidateIdAndJobOfferId(
            Long candidateId,
            Long jobOfferId
    );
}