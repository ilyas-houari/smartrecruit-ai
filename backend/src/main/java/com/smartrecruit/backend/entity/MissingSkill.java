package com.smartrecruit.backend.entity;

import com.smartrecruit.backend.enums.Importance;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(
        name = "missing_skills",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uq_missing_skills_pair",
                        columnNames = {"matching_result_id", "skill_id"}
                )
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MissingSkill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "matching_result_id", nullable = false)
    private MatchingResult matchingResult;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "skill_id", nullable = false)
    private Skill skill;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private Importance importance;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        if (importance == null) {
            importance = Importance.MEDIUM;
        }

        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }
    }
}