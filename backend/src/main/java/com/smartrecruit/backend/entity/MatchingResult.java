package com.smartrecruit.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(
        name = "matching_results",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uq_matching_results_application",
                        columnNames = "application_id"
                )
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MatchingResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
            name = "application_id",
            nullable = false,
            unique = true
    )
    private Application application;

    @Column(
            name = "skill_score",
            nullable = false,
            precision = 5,
            scale = 2
    )
    private BigDecimal skillScore;

    @Column(
            name = "experience_score",
            nullable = false,
            precision = 5,
            scale = 2
    )
    private BigDecimal experienceScore;

    @Column(
            name = "education_score",
            nullable = false,
            precision = 5,
            scale = 2
    )
    private BigDecimal educationScore;

    @Column(
            name = "final_score",
            precision = 5,
            scale = 2,
            insertable = false,
            updatable = false
    )
    private BigDecimal finalScore;

    @Column(columnDefinition = "TEXT")
    private String explanation;

    @Column(name = "algorithm_version", nullable = false, length = 50)
    private String algorithmVersion;

    @Column(name = "calculated_at", nullable = false)
    private LocalDateTime calculatedAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        LocalDateTime now = LocalDateTime.now();

        if (algorithmVersion == null) {
            algorithmVersion = "v1.0";
        }

        if (calculatedAt == null) {
            calculatedAt = now;
        }

        updatedAt = now;
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}