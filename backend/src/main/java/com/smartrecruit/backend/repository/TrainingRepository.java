package com.smartrecruit.backend.repository;

import com.smartrecruit.backend.entity.Training;
import com.smartrecruit.backend.enums.TrainingStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TrainingRepository extends JpaRepository<Training, Long> {

    List<Training> findByStatus(TrainingStatus status);

    List<Training> findByTitleContainingIgnoreCase(String title);
}