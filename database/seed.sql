-- ============================================================
-- SmartRecruit AI — Core Seed Data v1.0
-- Execute AFTER schema.sql
-- ============================================================

USE smartrecruit;

-- ------------------------------------------------------------
-- SKILLS
-- normalized_name is lowercase/canonical.
-- ------------------------------------------------------------
INSERT INTO skills (name, normalized_name, category) VALUES
('Java', 'java', 'Programming Language'),
('Spring Boot', 'spring boot', 'Backend'),
('Angular', 'angular', 'Frontend'),
('TypeScript', 'typescript', 'Programming Language'),
('JavaScript', 'javascript', 'Programming Language'),
('HTML', 'html', 'Frontend'),
('CSS', 'css', 'Frontend'),
('Bootstrap', 'bootstrap', 'Frontend'),
('Python', 'python', 'Programming Language'),
('FastAPI', 'fastapi', 'Backend'),
('PHP', 'php', 'Programming Language'),
('Laravel', 'laravel', 'Backend'),
('MySQL', 'mysql', 'Database'),
('PostgreSQL', 'postgresql', 'Database'),
('MongoDB', 'mongodb', 'Database'),
('REST API', 'rest api', 'Backend'),
('Git', 'git', 'Development Tool'),
('GitHub', 'github', 'Development Tool'),
('Docker', 'docker', 'DevOps'),
('Docker Compose', 'docker compose', 'DevOps'),
('Kubernetes', 'kubernetes', 'DevOps'),
('Linux', 'linux', 'Operating System'),
('Machine Learning', 'machine learning', 'Artificial Intelligence'),
('NLP', 'nlp', 'Artificial Intelligence'),
('spaCy', 'spacy', 'Artificial Intelligence'),
('Transformers', 'transformers', 'Artificial Intelligence'),
('Spring Security', 'spring security', 'Backend'),
('JWT', 'jwt', 'Security'),
('JPA', 'jpa', 'Backend'),
('Hibernate', 'hibernate', 'Backend')
ON DUPLICATE KEY UPDATE
    name = VALUES(name),
    category = VALUES(category);


-- ------------------------------------------------------------
-- TRAININGS
-- ------------------------------------------------------------
INSERT INTO trainings
(title, description, provider, url, level, duration_hours, is_free, status)
VALUES
(
    'Docker Fundamentals',
    'Learn Docker images, containers, volumes and networking.',
    'SmartRecruit Training Catalog',
    NULL,
    'BEGINNER',
    8,
    TRUE,
    'ACTIVE'
),
(
    'Kubernetes Fundamentals',
    'Introduction to Kubernetes workloads, services and orchestration.',
    'SmartRecruit Training Catalog',
    NULL,
    'BEGINNER',
    10,
    TRUE,
    'ACTIVE'
),
(
    'Spring Boot Fundamentals',
    'Build REST APIs using Java and Spring Boot.',
    'SmartRecruit Training Catalog',
    NULL,
    'BEGINNER',
    12,
    TRUE,
    'ACTIVE'
),
(
    'Angular Fundamentals',
    'Build modern web interfaces using Angular and TypeScript.',
    'SmartRecruit Training Catalog',
    NULL,
    'BEGINNER',
    12,
    TRUE,
    'ACTIVE'
),
(
    'Introduction to DevOps',
    'Learn Git, Docker, CI/CD and deployment fundamentals.',
    'SmartRecruit Training Catalog',
    NULL,
    'BEGINNER',
    14,
    TRUE,
    'ACTIVE'
);


-- ------------------------------------------------------------
-- TRAINING <-> SKILL mappings
-- ------------------------------------------------------------
INSERT IGNORE INTO training_skills (training_id, skill_id)
SELECT t.id, s.id
FROM trainings t
JOIN skills s ON s.normalized_name = 'docker'
WHERE t.title = 'Docker Fundamentals';

INSERT IGNORE INTO training_skills (training_id, skill_id)
SELECT t.id, s.id
FROM trainings t
JOIN skills s ON s.normalized_name = 'kubernetes'
WHERE t.title = 'Kubernetes Fundamentals';

INSERT IGNORE INTO training_skills (training_id, skill_id)
SELECT t.id, s.id
FROM trainings t
JOIN skills s ON s.normalized_name = 'spring boot'
WHERE t.title = 'Spring Boot Fundamentals';

INSERT IGNORE INTO training_skills (training_id, skill_id)
SELECT t.id, s.id
FROM trainings t
JOIN skills s ON s.normalized_name = 'angular'
WHERE t.title = 'Angular Fundamentals';

INSERT IGNORE INTO training_skills (training_id, skill_id)
SELECT t.id, s.id
FROM trainings t
JOIN skills s ON s.normalized_name IN ('git','docker','docker compose')
WHERE t.title = 'Introduction to DevOps';

-- ============================================================
-- END seed.sql
-- ============================================================
