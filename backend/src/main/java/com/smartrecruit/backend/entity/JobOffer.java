package com.smartrecruit.backend.entity;

import com.smartrecruit.backend.enums.ContractType;
import com.smartrecruit.backend.enums.EducationLevel;
import com.smartrecruit.backend.enums.JobStatus;
import com.smartrecruit.backend.enums.WorkMode;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "job_offers")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JobOffer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "recruiter_id", nullable = false)
    private Recruiter recruiter;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(length = 150)
    private String location;

    @Enumerated(EnumType.STRING)
    @Column(name = "work_mode", nullable = false)
    private WorkMode workMode;

    @Enumerated(EnumType.STRING)
    @Column(name = "contract_type", nullable = false)
    private ContractType contractType;

    @Column(
            name = "required_experience_years",
            nullable = false,
            precision = 4,
            scale = 1
    )
    private BigDecimal requiredExperienceYears;

    @Enumerated(EnumType.STRING)
    @Column(name = "required_education_level", nullable = false)
    private EducationLevel requiredEducationLevel;

    @Column(name = "salary_min", precision = 12, scale = 2)
    private BigDecimal salaryMin;

    @Column(name = "salary_max", precision = 12, scale = 2)
    private BigDecimal salaryMax;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private JobStatus status;

    @Column(name = "published_at")
    private LocalDateTime publishedAt;

    @Column
    private LocalDate deadline;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        LocalDateTime now = LocalDateTime.now();

        if (workMode == null) {
            workMode = WorkMode.ONSITE;
        }

        if (contractType == null) {
            contractType = ContractType.CDI;
        }

        if (requiredExperienceYears == null) {
            requiredExperienceYears = BigDecimal.ZERO;
        }

        if (requiredEducationLevel == null) {
            requiredEducationLevel = EducationLevel.NONE;
        }

        if (status == null) {
            status = JobStatus.DRAFT;
        }

        createdAt = now;
        updatedAt = now;
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}