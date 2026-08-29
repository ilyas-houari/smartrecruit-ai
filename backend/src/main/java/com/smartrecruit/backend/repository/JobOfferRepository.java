// JobOfferRepository.java
package com.smartrecruit.backend.repository;

import com.smartrecruit.backend.entity.JobOffer;
import com.smartrecruit.backend.enums.JobStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JobOfferRepository extends JpaRepository<JobOffer, Long> {

    List<JobOffer> findByStatus(JobStatus status);

    List<JobOffer> findByRecruiterId(Long recruiterId);

    List<JobOffer> findByCompanyId(Long companyId);

    List<JobOffer> findByTitleContainingIgnoreCase(String title);
}