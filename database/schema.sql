-- ============================================================
-- SmartRecruit AI — Database Contract v1.0
-- DBMS: MySQL 8.0.16+
-- Charset: utf8mb4
-- IMPORTANT:
--   This schema is aligned with the FINAL domain model:
--   User, Candidate, Recruiter, Company, CV, Experience,
--   Education, Skill, CandidateSkill, JobOffer, JobSkill,
--   Application, MatchingResult, MissingSkill, Training,
--   TrainingSkill, JobRecommendation, TrainingRecommendation.
-- ============================================================

CREATE DATABASE IF NOT EXISTS smartrecruit
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE smartrecruit;

-- ============================================================
-- 1) USERS
-- One account = one role.
-- Admin does not need a separate profile table.
-- ============================================================
CREATE TABLE users (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(190) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    phone VARCHAR(30) NULL,

    role ENUM('ADMIN','CANDIDATE','RECRUITER') NOT NULL,
    status ENUM('ACTIVE','INACTIVE','SUSPENDED') NOT NULL DEFAULT 'ACTIVE',

    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),
    CONSTRAINT uq_users_email UNIQUE (email),
    INDEX idx_users_role (role),
    INDEX idx_users_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- 2) COMPANIES
-- ============================================================
CREATE TABLE companies (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    name VARCHAR(150) NOT NULL,
    description TEXT NULL,
    website VARCHAR(500) NULL,
    city VARCHAR(100) NULL,
    country VARCHAR(100) NOT NULL DEFAULT 'Morocco',
    industry VARCHAR(150) NULL,
    logo_url VARCHAR(500) NULL,

    status ENUM('ACTIVE','INACTIVE') NOT NULL DEFAULT 'ACTIVE',

    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),
    INDEX idx_companies_name (name),
    INDEX idx_companies_city (city),
    INDEX idx_companies_industry (industry),
    INDEX idx_companies_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- 3) CANDIDATES
-- user_id UNIQUE => one Candidate profile per User.
-- ============================================================
CREATE TABLE candidates (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    user_id BIGINT UNSIGNED NOT NULL,

    city VARCHAR(100) NULL,
    country VARCHAR(100) NOT NULL DEFAULT 'Morocco',
    bio TEXT NULL,

    linkedin_url VARCHAR(500) NULL,
    github_url VARCHAR(500) NULL,
    portfolio_url VARCHAR(500) NULL,

    total_experience_months INT UNSIGNED NOT NULL DEFAULT 0,

    highest_education_level ENUM(
        'NONE','BAC','BAC_2','BAC_3','MASTER','ENGINEERING','PHD','OTHER'
    ) NOT NULL DEFAULT 'NONE',

    profile_completed BOOLEAN NOT NULL DEFAULT FALSE,

    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),
    CONSTRAINT uq_candidates_user UNIQUE (user_id),

    CONSTRAINT fk_candidates_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    INDEX idx_candidates_city (city),
    INDEX idx_candidates_education (highest_education_level),
    INDEX idx_candidates_profile_completed (profile_completed)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- 4) RECRUITERS
-- company_id is nullable during onboarding.
-- Before creating/publishing jobs, Backend must require a company.
-- Composite unique key is used by job_offers to guarantee that
-- the selected recruiter really belongs to the selected company.
-- ============================================================
CREATE TABLE recruiters (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    user_id BIGINT UNSIGNED NOT NULL,
    company_id BIGINT UNSIGNED NULL,

    position VARCHAR(150) NULL,

    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    CONSTRAINT uq_recruiters_user UNIQUE (user_id),
    CONSTRAINT uq_recruiter_company_pair UNIQUE (id, company_id),

    CONSTRAINT fk_recruiters_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_recruiters_company
        FOREIGN KEY (company_id)
        REFERENCES companies(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE,

    INDEX idx_recruiters_company (company_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- 5) CVS
-- Generated column + UNIQUE enforces max one active CV/candidate.
-- MySQL UNIQUE allows multiple NULL values, therefore inactive CVs
-- do not conflict with each other.
-- ============================================================
CREATE TABLE cvs (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    candidate_id BIGINT UNSIGNED NOT NULL,

    file_name VARCHAR(255) NOT NULL,
    stored_file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(1000) NOT NULL,
    mime_type VARCHAR(150) NULL,
    file_size BIGINT UNSIGNED NULL,

    file_type ENUM('PDF','DOCX') NOT NULL,

    extracted_text LONGTEXT NULL,

    analysis_status ENUM(
        'UPLOADED','PROCESSING','ANALYZED','VALIDATED','FAILED'
    ) NOT NULL DEFAULT 'UPLOADED',

    analysis_error TEXT NULL,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    uploaded_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    analyzed_at DATETIME NULL,
    validated_at DATETIME NULL,

    active_candidate_id BIGINT UNSIGNED
        GENERATED ALWAYS AS (
            CASE WHEN is_active = TRUE THEN candidate_id ELSE NULL END
        ) STORED,

    PRIMARY KEY (id),

    CONSTRAINT fk_cvs_candidate
        FOREIGN KEY (candidate_id)
        REFERENCES candidates(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT uq_cvs_one_active_per_candidate
        UNIQUE (active_candidate_id),

    INDEX idx_cvs_candidate (candidate_id),
    INDEX idx_cvs_analysis_status (analysis_status),
    INDEX idx_cvs_uploaded_at (uploaded_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- 6) EXPERIENCES
-- ============================================================
CREATE TABLE experiences (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    candidate_id BIGINT UNSIGNED NOT NULL,

    job_title VARCHAR(200) NOT NULL,
    company_name VARCHAR(200) NULL,
    description TEXT NULL,

    start_date DATE NULL,
    end_date DATE NULL,
    is_current BOOLEAN NOT NULL DEFAULT FALSE,

    duration_months INT UNSIGNED NOT NULL DEFAULT 0,

    source ENUM('CV','MANUAL','AI') NOT NULL DEFAULT 'CV',

    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    CONSTRAINT fk_experiences_candidate
        FOREIGN KEY (candidate_id)
        REFERENCES candidates(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT chk_experiences_dates
        CHECK (
            start_date IS NULL
            OR end_date IS NULL
            OR end_date >= start_date
        ),

    INDEX idx_experiences_candidate (candidate_id),
    INDEX idx_experiences_job_title (job_title),
    INDEX idx_experiences_dates (start_date, end_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- 7) EDUCATIONS
-- ============================================================
CREATE TABLE educations (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    candidate_id BIGINT UNSIGNED NOT NULL,

    degree VARCHAR(200) NOT NULL,
    field VARCHAR(200) NULL,
    institution VARCHAR(200) NULL,

    start_year SMALLINT UNSIGNED NULL,
    end_year SMALLINT UNSIGNED NULL,

    level ENUM(
        'NONE','BAC','BAC_2','BAC_3','MASTER','ENGINEERING','PHD','OTHER'
    ) NOT NULL DEFAULT 'OTHER',

    source ENUM('CV','MANUAL','AI') NOT NULL DEFAULT 'CV',

    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    CONSTRAINT fk_educations_candidate
        FOREIGN KEY (candidate_id)
        REFERENCES candidates(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT chk_educations_years
        CHECK (
            start_year IS NULL
            OR end_year IS NULL
            OR end_year >= start_year
        ),

    INDEX idx_educations_candidate (candidate_id),
    INDEX idx_educations_level (level)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- 8) SKILLS
-- Technologies are stored as Skills.
-- normalized_name is the canonical uniqueness key.
-- ============================================================
CREATE TABLE skills (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,

    name VARCHAR(150) NOT NULL,
    normalized_name VARCHAR(150) NOT NULL,
    category VARCHAR(100) NULL,

    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    CONSTRAINT uq_skills_normalized_name UNIQUE (normalized_name),

    INDEX idx_skills_name (name),
    INDEX idx_skills_category (category)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- 9) CANDIDATE_SKILLS
-- Association Candidate <-> Skill.
-- ============================================================
CREATE TABLE candidate_skills (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    candidate_id BIGINT UNSIGNED NOT NULL,
    skill_id BIGINT UNSIGNED NOT NULL,

    level ENUM('BEGINNER','INTERMEDIATE','ADVANCED','EXPERT') NULL,
    source ENUM('CV','MANUAL','AI') NOT NULL DEFAULT 'CV',
    confidence_score DECIMAL(5,2) NULL,

    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    CONSTRAINT uq_candidate_skills_pair
        UNIQUE (candidate_id, skill_id),

    CONSTRAINT fk_candidate_skills_candidate
        FOREIGN KEY (candidate_id)
        REFERENCES candidates(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_candidate_skills_skill
        FOREIGN KEY (skill_id)
        REFERENCES skills(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    CONSTRAINT chk_candidate_skills_confidence
        CHECK (
            confidence_score IS NULL
            OR confidence_score BETWEEN 0 AND 100
        ),

    INDEX idx_candidate_skills_candidate (candidate_id),
    INDEX idx_candidate_skills_skill (skill_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- 10) JOB_OFFERS
-- Composite FK (recruiter_id, company_id) guarantees that
-- recruiter belongs to the company attached to the offer.
-- ============================================================
CREATE TABLE job_offers (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,

    recruiter_id BIGINT UNSIGNED NOT NULL,
    company_id BIGINT UNSIGNED NOT NULL,

    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(150) NULL,

    work_mode ENUM('ONSITE','REMOTE','HYBRID') NOT NULL DEFAULT 'ONSITE',

    contract_type ENUM(
        'CDI','CDD','INTERNSHIP','FREELANCE','PART_TIME','OTHER'
    ) NOT NULL DEFAULT 'CDI',

    required_experience_years DECIMAL(4,1) NOT NULL DEFAULT 0,

    required_education_level ENUM(
        'NONE','BAC','BAC_2','BAC_3','MASTER','ENGINEERING','PHD','OTHER'
    ) NOT NULL DEFAULT 'NONE',

    salary_min DECIMAL(12,2) NULL,
    salary_max DECIMAL(12,2) NULL,

    status ENUM('DRAFT','PUBLISHED','CLOSED','ARCHIVED')
        NOT NULL DEFAULT 'DRAFT',

    published_at DATETIME NULL,
    deadline DATE NULL,

    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    CONSTRAINT fk_job_offers_recruiter_company
        FOREIGN KEY (recruiter_id, company_id)
        REFERENCES recruiters(id, company_id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    CONSTRAINT fk_job_offers_company
        FOREIGN KEY (company_id)
        REFERENCES companies(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    CONSTRAINT chk_job_offers_experience
        CHECK (required_experience_years >= 0),

    CONSTRAINT chk_job_offers_salary_min
        CHECK (salary_min IS NULL OR salary_min >= 0),

    CONSTRAINT chk_job_offers_salary_max
        CHECK (salary_max IS NULL OR salary_max >= 0),

    CONSTRAINT chk_job_offers_salary_range
        CHECK (
            salary_min IS NULL
            OR salary_max IS NULL
            OR salary_max >= salary_min
        ),

    INDEX idx_job_offers_recruiter (recruiter_id),
    INDEX idx_job_offers_company (company_id),
    INDEX idx_job_offers_status (status),
    INDEX idx_job_offers_title (title),
    INDEX idx_job_offers_location (location),
    INDEX idx_job_offers_work_mode (work_mode),
    INDEX idx_job_offers_contract_type (contract_type),
    INDEX idx_job_offers_published_at (published_at),
    INDEX idx_job_offers_deadline (deadline)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- 11) JOB_SKILLS
-- Association JobOffer <-> Skill.
-- ============================================================
CREATE TABLE job_skills (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    job_offer_id BIGINT UNSIGNED NOT NULL,
    skill_id BIGINT UNSIGNED NOT NULL,

    required_level ENUM('BEGINNER','INTERMEDIATE','ADVANCED','EXPERT') NULL,
    mandatory BOOLEAN NOT NULL DEFAULT TRUE,
    weight DECIMAL(5,2) NULL,

    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    CONSTRAINT uq_job_skills_pair
        UNIQUE (job_offer_id, skill_id),

    CONSTRAINT fk_job_skills_job_offer
        FOREIGN KEY (job_offer_id)
        REFERENCES job_offers(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_job_skills_skill
        FOREIGN KEY (skill_id)
        REFERENCES skills(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    CONSTRAINT chk_job_skills_weight
        CHECK (
            weight IS NULL
            OR weight BETWEEN 0 AND 100
        ),

    INDEX idx_job_skills_job_offer (job_offer_id),
    INDEX idx_job_skills_skill (skill_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- 12) APPLICATIONS
-- Unique candidate/job pair prevents duplicate applications.
-- ============================================================
CREATE TABLE applications (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    candidate_id BIGINT UNSIGNED NOT NULL,
    job_offer_id BIGINT UNSIGNED NOT NULL,

    status ENUM(
        'SUBMITTED','UNDER_REVIEW','SHORTLISTED',
        'ACCEPTED','REJECTED','WITHDRAWN'
    ) NOT NULL DEFAULT 'SUBMITTED',

    cover_letter TEXT NULL,

    applied_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    reviewed_at DATETIME NULL,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    CONSTRAINT uq_applications_candidate_job
        UNIQUE (candidate_id, job_offer_id),

    CONSTRAINT fk_applications_candidate
        FOREIGN KEY (candidate_id)
        REFERENCES candidates(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_applications_job_offer
        FOREIGN KEY (job_offer_id)
        REFERENCES job_offers(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    INDEX idx_applications_candidate (candidate_id),
    INDEX idx_applications_job_offer (job_offer_id),
    INDEX idx_applications_status (status),
    INDEX idx_applications_job_status (job_offer_id, status),
    INDEX idx_applications_applied_at (applied_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- 13) MATCHING_RESULTS
-- final_score is generated from the official PFE formula:
-- 50% Skills + 30% Experience + 20% Education.
-- ============================================================
CREATE TABLE matching_results (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    application_id BIGINT UNSIGNED NOT NULL,

    skill_score DECIMAL(5,2) NOT NULL,
    experience_score DECIMAL(5,2) NOT NULL,
    education_score DECIMAL(5,2) NOT NULL,

    final_score DECIMAL(5,2)
        GENERATED ALWAYS AS (
            ROUND(
                (skill_score * 0.50) +
                (experience_score * 0.30) +
                (education_score * 0.20),
                2
            )
        ) STORED,

    explanation TEXT NULL,
    algorithm_version VARCHAR(50) NOT NULL DEFAULT 'v1.0',

    calculated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    CONSTRAINT uq_matching_results_application
        UNIQUE (application_id),

    CONSTRAINT fk_matching_results_application
        FOREIGN KEY (application_id)
        REFERENCES applications(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT chk_matching_skill_score
        CHECK (skill_score BETWEEN 0 AND 100),

    CONSTRAINT chk_matching_experience_score
        CHECK (experience_score BETWEEN 0 AND 100),

    CONSTRAINT chk_matching_education_score
        CHECK (education_score BETWEEN 0 AND 100),

    INDEX idx_matching_results_final_score (final_score),
    INDEX idx_matching_results_calculated_at (calculated_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- 14) MISSING_SKILLS
-- ============================================================
CREATE TABLE missing_skills (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    matching_result_id BIGINT UNSIGNED NOT NULL,
    skill_id BIGINT UNSIGNED NOT NULL,

    importance ENUM('LOW','MEDIUM','HIGH','CRITICAL')
        NOT NULL DEFAULT 'MEDIUM',

    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    CONSTRAINT uq_missing_skills_pair
        UNIQUE (matching_result_id, skill_id),

    CONSTRAINT fk_missing_skills_matching_result
        FOREIGN KEY (matching_result_id)
        REFERENCES matching_results(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_missing_skills_skill
        FOREIGN KEY (skill_id)
        REFERENCES skills(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    INDEX idx_missing_skills_matching_result (matching_result_id),
    INDEX idx_missing_skills_skill (skill_id),
    INDEX idx_missing_skills_importance (importance)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- 15) TRAININGS
-- ============================================================
CREATE TABLE trainings (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,

    title VARCHAR(200) NOT NULL,
    description TEXT NULL,
    provider VARCHAR(200) NULL,
    url VARCHAR(1000) NULL,

    level ENUM(
        'BEGINNER','INTERMEDIATE','ADVANCED','ALL_LEVELS'
    ) NOT NULL DEFAULT 'ALL_LEVELS',

    duration_hours DECIMAL(8,2) NULL,
    is_free BOOLEAN NOT NULL DEFAULT TRUE,

    status ENUM('ACTIVE','INACTIVE') NOT NULL DEFAULT 'ACTIVE',

    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    CONSTRAINT chk_trainings_duration
        CHECK (duration_hours IS NULL OR duration_hours >= 0),

    INDEX idx_trainings_title (title),
    INDEX idx_trainings_provider (provider),
    INDEX idx_trainings_level (level),
    INDEX idx_trainings_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- 16) TRAINING_SKILLS
-- Association Training <-> Skill.
-- ============================================================
CREATE TABLE training_skills (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    training_id BIGINT UNSIGNED NOT NULL,
    skill_id BIGINT UNSIGNED NOT NULL,

    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    CONSTRAINT uq_training_skills_pair
        UNIQUE (training_id, skill_id),

    CONSTRAINT fk_training_skills_training
        FOREIGN KEY (training_id)
        REFERENCES trainings(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_training_skills_skill
        FOREIGN KEY (skill_id)
        REFERENCES skills(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    INDEX idx_training_skills_training (training_id),
    INDEX idx_training_skills_skill (skill_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- 17) JOB_RECOMMENDATIONS
-- Stored separately from training recommendations to maintain
-- real foreign keys and referential integrity.
-- ============================================================
CREATE TABLE job_recommendations (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    candidate_id BIGINT UNSIGNED NOT NULL,
    job_offer_id BIGINT UNSIGNED NOT NULL,

    recommendation_score DECIMAL(5,2) NOT NULL,
    reason TEXT NULL,

    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    CONSTRAINT uq_job_recommendations_pair
        UNIQUE (candidate_id, job_offer_id),

    CONSTRAINT fk_job_recommendations_candidate
        FOREIGN KEY (candidate_id)
        REFERENCES candidates(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_job_recommendations_job_offer
        FOREIGN KEY (job_offer_id)
        REFERENCES job_offers(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT chk_job_recommendations_score
        CHECK (recommendation_score BETWEEN 0 AND 100),

    INDEX idx_job_recommendations_candidate (candidate_id),
    INDEX idx_job_recommendations_score (recommendation_score)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- 18) TRAINING_RECOMMENDATIONS
-- ============================================================
CREATE TABLE training_recommendations (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    candidate_id BIGINT UNSIGNED NOT NULL,
    training_id BIGINT UNSIGNED NOT NULL,

    recommendation_score DECIMAL(5,2) NOT NULL,
    reason TEXT NULL,

    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    CONSTRAINT uq_training_recommendations_pair
        UNIQUE (candidate_id, training_id),

    CONSTRAINT fk_training_recommendations_candidate
        FOREIGN KEY (candidate_id)
        REFERENCES candidates(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_training_recommendations_training
        FOREIGN KEY (training_id)
        REFERENCES trainings(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    CONSTRAINT chk_training_recommendations_score
        CHECK (recommendation_score BETWEEN 0 AND 100),

    INDEX idx_training_recommendations_candidate (candidate_id),
    INDEX idx_training_recommendations_score (recommendation_score)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- VIEWS
-- ============================================================

CREATE OR REPLACE VIEW vw_candidate_profiles AS
SELECT
    c.id AS candidate_id,
    u.id AS user_id,
    u.first_name,
    u.last_name,
    u.email,
    u.phone,
    u.status AS user_status,
    c.city,
    c.country,
    c.total_experience_months,
    c.highest_education_level,
    c.profile_completed,
    c.created_at,
    c.updated_at
FROM candidates c
JOIN users u ON u.id = c.user_id;


CREATE OR REPLACE VIEW vw_published_jobs AS
SELECT
    jo.id AS job_offer_id,
    jo.title,
    jo.description,
    jo.location,
    jo.work_mode,
    jo.contract_type,
    jo.required_experience_years,
    jo.required_education_level,
    jo.salary_min,
    jo.salary_max,
    jo.published_at,
    jo.deadline,
    c.id AS company_id,
    c.name AS company_name,
    r.id AS recruiter_id
FROM job_offers jo
JOIN companies c ON c.id = jo.company_id
JOIN recruiters r ON r.id = jo.recruiter_id
WHERE jo.status = 'PUBLISHED';


CREATE OR REPLACE VIEW vw_job_candidate_ranking AS
SELECT
    jo.id AS job_offer_id,
    jo.title AS job_title,
    a.id AS application_id,
    a.status AS application_status,
    c.id AS candidate_id,
    CONCAT(u.first_name, ' ', u.last_name) AS candidate_name,
    mr.skill_score,
    mr.experience_score,
    mr.education_score,
    mr.final_score,
    a.applied_at
FROM applications a
JOIN candidates c ON c.id = a.candidate_id
JOIN users u ON u.id = c.user_id
JOIN job_offers jo ON jo.id = a.job_offer_id
LEFT JOIN matching_results mr ON mr.application_id = a.id;


CREATE OR REPLACE VIEW vw_candidate_missing_skills AS
SELECT
    a.candidate_id,
    a.job_offer_id,
    mr.id AS matching_result_id,
    s.id AS skill_id,
    s.name AS skill_name,
    ms.importance
FROM missing_skills ms
JOIN matching_results mr ON mr.id = ms.matching_result_id
JOIN applications a ON a.id = mr.application_id
JOIN skills s ON s.id = ms.skill_id;


-- ============================================================
-- NOTE: Cross-table business rules
-- ============================================================
-- The following rules are intentionally enforced in Spring Boot,
-- because they depend on application workflow or multiple tables:
--
-- 1) A User with role CANDIDATE must have a Candidate profile.
-- 2) A User with role RECRUITER must have a Recruiter profile.
-- 3) Recruiter must have a company before creating/publishing jobs.
-- 4) A PUBLISHED JobOffer must have at least one JobSkill.
-- 5) Application status transitions must follow the allowed lifecycle.
-- 6) Candidate may apply only to PUBLISHED, non-expired jobs.
-- 7) Public registration cannot create ADMIN users.
--
-- ============================================================
-- END schema.sql
-- ============================================================
