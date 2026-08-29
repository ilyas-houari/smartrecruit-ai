package com.smartrecruit.backend.entity;

import com.smartrecruit.backend.enums.DataSource;
import com.smartrecruit.backend.enums.EducationLevel;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "educations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Education {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "candidate_id", nullable = false)
    private Candidate candidate;

    @Column(nullable = false, length = 200)
    private String degree;

    @Column(length = 200)
    private String field;

    @Column(length = 200)
    private String institution;

    @Column(name = "start_year")
    private Integer startYear;

    @Column(name = "end_year")
    private Integer endYear;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private EducationLevel level;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private DataSource source;

    @PrePersist
    protected void onCreate() {
        if (level == null) {
            level = EducationLevel.NONE;
        }

        if (source == null) {
            source = DataSource.CV;
        }
    }
}