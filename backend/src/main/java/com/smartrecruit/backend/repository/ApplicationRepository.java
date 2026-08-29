// ApplicationRepository.java
package com.smartrecruit.backend.repository;

import com.smartrecruit.backend.entity.Application;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ApplicationRepository extends JpaRepository<Application, Long> {

    List<Application> findByCandidateId(Long candidateId);

    List<Application> findByJobOfferId(Long jobOfferId);

    Optional<Application> findByCandidateIdAndJobOfferId(Long candidateId, Long jobOfferId);

    boolean existsByCandidateIdAndJobOfferId(Long candidateId, Long jobOfferId);
}