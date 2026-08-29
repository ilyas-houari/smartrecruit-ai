package com.smartrecruit.backend.repository;

import com.smartrecruit.backend.entity.MatchingResult;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MatchingResultRepository extends JpaRepository<MatchingResult, Long> {

    Optional<MatchingResult> findByApplicationId(Long applicationId);
}