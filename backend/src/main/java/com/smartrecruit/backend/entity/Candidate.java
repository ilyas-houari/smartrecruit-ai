package com.smartrecruit.backend.entity;

import com.smartrecruit.backend.enums.EducationLevel;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "candidates")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Candidate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
            name = "user_id",
            nullable = false,
            unique = true
    )
    private User user;

    @Column(length = 100)
    private String city;

    @Column(nullable = false, length = 100)
    private String country;

    @Column(columnDefinition = "TEXT")
    private String bio;

    @Column(name = "linkedin_url", length = 500)
    private String linkedinUrl;

    @Column(name = "github_url", length = 500)
    private String githubUrl;

    @Column(name = "portfolio_url", length = 500)
    private String portfolioUrl;

    @Column(name = "total_experience_months", nullable = false)
    private Integer totalExperienceMonths;

    @Enumerated(EnumType.STRING)
    @Column(name = "highest_education_level", nullable = false)
    private EducationLevel highestEducationLevel;

    @Column(name = "profile_completed", nullable = false)
    private Boolean profileCompleted;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        LocalDateTime now = LocalDateTime.now();

        if (country == null) {
            country = "Morocco";
        }

        if (totalExperienceMonths == null) {
            totalExperienceMonths = 0;
        }

        if (highestEducationLevel == null) {
            highestEducationLevel = EducationLevel.NONE;
        }

        if (profileCompleted == null) {
            profileCompleted = false;
        }

        createdAt = now;
        updatedAt = now;
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}