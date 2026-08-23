# SmartRecruit AI — Project Tasks

## Team

| Member | Main Responsibility |
|---|---|
| Ilyas Houari | Backend — Spring Boot |
| Ilyas Boukaya | AI / NLP — Python & FastAPI |
| Mohammed Hamdani | Frontend — Angular |
| Oussama Rich | Database — MySQL, Testing & Integration |

---

# 1. Ilyas Houari — Backend

## Technologies

- Java
- Spring Boot
- Spring Security
- JWT
- Spring Data JPA
- REST API
- Maven
- MySQL
- Postman

## Phase 1 — Project Setup

- [ ] Create Spring Boot project
- [ ] Create backend package structure
- [ ] Configure Maven dependencies
- [ ] Connect Spring Boot to MySQL
- [ ] Configure application properties
- [ ] Test backend startup
- [ ] Test database connection

## Phase 2 — Authentication & Security

- [ ] User entity
- [ ] Role entity
- [ ] UserRepository
- [ ] RoleRepository
- [ ] Registration API
- [ ] Login API
- [ ] Password encryption with BCrypt
- [ ] JWT generation
- [ ] JWT validation
- [ ] Spring Security configuration
- [ ] Role-based authorization
- [ ] CANDIDATE role
- [ ] RECRUITER role
- [ ] ADMIN role

Main endpoints:

```text
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
```

## Phase 3 — Candidate

- [ ] Candidate entity
- [ ] Candidate repository
- [ ] Candidate service
- [ ] Candidate controller
- [ ] Candidate profile API
- [ ] Update candidate profile
- [ ] Candidate skills
- [ ] Candidate experiences
- [ ] Candidate education

## Phase 4 — Recruiter & Company

- [ ] Recruiter entity
- [ ] Company entity
- [ ] Repositories
- [ ] Services
- [ ] Controllers
- [ ] Recruiter profile
- [ ] Company profile
- [ ] Update company information

## Phase 5 — Job Offers

- [ ] JobOffer entity
- [ ] Skill entity
- [ ] JobSkill entity
- [ ] Job repositories
- [ ] Job service
- [ ] Job controller
- [ ] Create job
- [ ] Update job
- [ ] View job
- [ ] List jobs
- [ ] Close job
- [ ] Required skills management

Main endpoints:

```text
GET    /api/jobs
GET    /api/jobs/{id}
POST   /api/jobs
PUT    /api/jobs/{id}
DELETE /api/jobs/{id}
```

## Phase 6 — Applications

- [ ] Application entity
- [ ] Application repository
- [ ] Application service
- [ ] Apply for job
- [ ] Candidate application history
- [ ] Recruiter applicant list
- [ ] Application status management
- [ ] Prevent duplicate applications

## Phase 7 — CV Management

- [ ] CV entity
- [ ] CV upload API
- [ ] PDF/DOCX validation
- [ ] Store CV metadata
- [ ] Connect Backend to AI service
- [ ] Send CV for analysis
- [ ] Receive AI analysis
- [ ] Save extracted information

## Phase 8 — AI Integration

Spring Boot communicates with FastAPI.

Flow:

```text
Spring Boot
    ↓
FastAPI
    ↓
AI Result JSON
    ↓
Spring Boot
    ↓
MySQL
```

Tasks:

- [ ] AI service HTTP client
- [ ] CV analysis integration
- [ ] Matching integration
- [ ] Handle AI errors
- [ ] Validate AI responses

## Phase 9 — Matching & Recommendations

- [ ] MatchingResult entity
- [ ] MissingSkill entity
- [ ] Send candidate/job data to AI
- [ ] Receive matching score
- [ ] Save matching result
- [ ] Save missing skills
- [ ] Return candidate ranking
- [ ] Job recommendations API
- [ ] Training recommendations API

---

# 2. Ilyas Boukaya — AI / NLP

## Technologies

- Python
- FastAPI
- spaCy
- NLP
- PyMuPDF
- python-docx
- Pydantic

## Phase 1 — AI Service Setup

- [ ] Create Python project
- [ ] Create virtual environment
- [ ] Install dependencies
- [ ] Create FastAPI application
- [ ] Configure project structure
- [ ] Run FastAPI locally
- [ ] Verify Swagger documentation

Target:

```text
http://localhost:8000
http://localhost:8000/docs
```

## Phase 2 — CV Text Extraction

- [ ] Accept CV file
- [ ] PDF text extraction
- [ ] DOCX text extraction
- [ ] Clean extracted text
- [ ] Handle invalid files
- [ ] Handle empty CVs

## Phase 3 — NLP CV Analysis

Extract:

- [ ] Name
- [ ] Email
- [ ] Skills
- [ ] Technologies
- [ ] Experience
- [ ] Education
- [ ] Diplomas

Main endpoint:

```text
POST /ai/analyze-cv
```

Example result:

```json
{
  "name": "Ahmed Alami",
  "email": "ahmed@gmail.com",
  "skills": [
    "Java",
    "Spring Boot",
    "MySQL"
  ],
  "experienceYears": 2,
  "educationLevel": "BAC_3"
}
```

## Phase 4 — Matching Engine

Matching strategy:

```text
Skills      = 50%
Experience  = 30%
Education   = 20%
```

Tasks:

- [ ] Compare candidate skills with job skills
- [ ] Calculate skill score
- [ ] Calculate experience score
- [ ] Calculate education score
- [ ] Calculate final score
- [ ] Detect missing skills

Main endpoint:

```text
POST /ai/match
```

Example result:

```json
{
  "skillScore": 75,
  "experienceScore": 100,
  "educationScore": 100,
  "finalScore": 87.5,
  "missingSkills": [
    "Docker"
  ]
}
```

## Phase 5 — Recommendations

- [ ] Recommend jobs based on candidate profile
- [ ] Detect skills that need improvement
- [ ] Recommend training for missing skills
- [ ] Return recommendation scores/reasons

## Phase 6 — AI Testing

Test with multiple CV types:

- [ ] Java Developer
- [ ] Frontend Developer
- [ ] Data/AI profile
- [ ] Junior candidate
- [ ] Experienced candidate
- [ ] CV with missing information

---

# 3. Mohammed Hamdani — Frontend Angular

## Technologies

- Angular
- TypeScript
- HTML
- CSS
- REST API

## Phase 1 — Frontend Setup

- [ ] Install/check Node.js
- [ ] Install/check Angular CLI
- [ ] Create Angular project
- [ ] Configure routing
- [ ] Create project structure
- [ ] Create shared layout
- [ ] Create navbar/sidebar

## Phase 2 — Authentication UI

- [ ] Login page
- [ ] Registration page
- [ ] Candidate registration
- [ ] Recruiter registration
- [ ] Form validation
- [ ] Error messages

Frontend can initially use mock data until Backend authentication is ready.

## Phase 3 — Candidate Interface

- [ ] Candidate dashboard
- [ ] Candidate profile
- [ ] CV upload page
- [ ] CV analysis result
- [ ] Jobs list
- [ ] Job details
- [ ] Apply button
- [ ] Applications history
- [ ] Matching result
- [ ] Missing skills
- [ ] Job recommendations
- [ ] Training recommendations

## Phase 4 — Recruiter Interface

- [ ] Recruiter dashboard
- [ ] Company profile
- [ ] My jobs
- [ ] Create job
- [ ] Edit job
- [ ] Job details
- [ ] Applicant list
- [ ] Candidate details
- [ ] Candidate ranking
- [ ] Application status management

## Phase 5 — Admin Interface

Priority: LOW until the main workflow works.

- [ ] Admin dashboard
- [ ] Users management
- [ ] Companies management
- [ ] Jobs management
- [ ] Trainings management

## Phase 6 — Frontend Core

- [ ] Angular models
- [ ] Services
- [ ] HTTP calls
- [ ] Authentication handling
- [ ] JWT interceptor
- [ ] Authentication guard
- [ ] Role guard
- [ ] Error handling
- [ ] Loading indicators
- [ ] Responsive interface

## Mock Data

Frontend must not wait for Backend.

Use fake data following the same structure defined in:

```text
docs/API_CONTRACTS.md
```

When Backend is ready:

```text
Mock Data
    ↓
Replace with HTTP Service
    ↓
Spring Boot API
```

The UI structure should not need to be rebuilt.

---

# 4. Oussama Rich — Database, Testing & Integration

## Technologies

- MySQL
- SQL
- MySQL Workbench
- Postman
- Git
- Docker / Docker Compose later

## Phase 1 — Database

- [ ] Create `smartrecruit` database
- [ ] Execute final database schema
- [ ] Verify all tables
- [ ] Verify primary keys
- [ ] Verify foreign keys
- [ ] Verify unique constraints
- [ ] Verify check constraints
- [ ] Verify indexes
- [ ] Verify cascade rules

Main database file:

```text
database/schema.sql
```

## Phase 2 — Seed & Test Data

Prepare:

- [ ] Roles
- [ ] Skills
- [ ] Companies
- [ ] Candidate test accounts
- [ ] Recruiter test accounts
- [ ] Job offers
- [ ] Trainings
- [ ] Applications
- [ ] Matching test data

Create later:

```text
database/seed.sql
```

## Phase 3 — Database Testing

Test:

- [ ] Duplicate email rejected
- [ ] Invalid foreign key rejected
- [ ] Duplicate application rejected
- [ ] Invalid matching score rejected
- [ ] Cascade behavior
- [ ] Required fields
- [ ] Database relationships

## Phase 4 — Backend Integration Support

Work with Backend developer to:

- [ ] Verify JPA mappings
- [ ] Verify Java/MySQL data types
- [ ] Verify relationships
- [ ] Verify database queries
- [ ] Verify test data
- [ ] Fix database integration problems

## Phase 5 — API Testing

Use Postman to test:

- [ ] Authentication
- [ ] Candidate APIs
- [ ] Recruiter APIs
- [ ] Job APIs
- [ ] Application APIs
- [ ] CV APIs
- [ ] Matching APIs
- [ ] Recommendation APIs

## Phase 6 — Integration Testing

Test complete communication:

```text
Angular
   ↓
Spring Boot
   ↓
MySQL
```

Then:

```text
Angular
   ↓
Spring Boot
   ↓
FastAPI
   ↓
Spring Boot
   ↓
MySQL
```

## Phase 7 — Docker

Docker is done after the main application works locally.

- [ ] Backend Dockerfile
- [ ] Frontend Dockerfile
- [ ] AI Service Dockerfile
- [ ] MySQL container
- [ ] Docker Compose
- [ ] Environment variables
- [ ] Full container test

---

# 5. Shared Team Tasks

These tasks require coordination between all members.

## API Contracts

Before integration, agree on:

- Request formats
- Response formats
- Field names
- Status values
- Error responses
- AI request/response formats

Official file:

```text
docs/API_CONTRACTS.md
```

## Database Contract

Official documentation:

```text
docs/DATABASE_DESIGN.md
database/schema.sql
```

Do not change database structure without informing the team.

## Git

Official workflow:

```text
docs/GIT_WORKFLOW.md
```

---

# 6. Development Priority

The team must prioritize the core workflow.

```text
Recruiter registers
        ↓
Creates company/profile
        ↓
Creates job offer
        ↓
Candidate registers
        ↓
Uploads CV
        ↓
AI analyzes CV
        ↓
Candidate profile is generated
        ↓
Candidate applies
        ↓
AI calculates matching
        ↓
Missing skills detected
        ↓
Recruiter sees ranking
        ↓
Candidate sees recommendations
```

This workflow must work before spending significant time on optional features.

---

# 7. First Milestone

## Ilyas Houari — Backend

```text
[ ] Spring Boot running
[ ] MySQL connected
[ ] User + Role
[ ] Register
[ ] Login
[ ] JWT
[ ] Basic security
[ ] Test with Postman
```

## Ilyas Boukaya — AI

```text
[ ] FastAPI running
[ ] Swagger working
[ ] PDF extraction
[ ] DOCX extraction
[ ] Basic skill extraction
[ ] /ai/analyze-cv working
[ ] /ai/match basic version working
```

## Mohammed Hamdani — Frontend

```text
[ ] Angular running
[ ] Routing
[ ] Login
[ ] Register
[ ] Candidate dashboard
[ ] Recruiter dashboard
[ ] Jobs page
[ ] CV upload page
[ ] Fake data working
```

## Oussama Rich — Database

```text
[ ] MySQL ready
[ ] Final schema executed
[ ] Tables verified
[ ] Relations verified
[ ] Initial roles/skills
[ ] Test data
[ ] Constraints tested
```

---

# 8. Team Progress Format

Each member reports progress using:

```text
DONE:
- ...

DOING:
- ...

BLOCKED:
- ...

NEED FROM TEAM:
- ...
```

Example:

```text
DONE:
- Spring Boot project created
- MySQL connected

DOING:
- Authentication

BLOCKED:
- None

NEED FROM TEAM:
- Final login response contract
```

---

# 9. Task Status

Use:

```text
TODO
IN PROGRESS
BLOCKED
DONE
```

Do not mark a task as DONE before testing it.

---

# 10. Final Project Goal

The final application must demonstrate:

```text
Authentication
+
Candidate Management
+
Recruiter Management
+
Job Management
+
CV Analysis
+
NLP
+
Applications
+
AI Matching
+
Candidate Ranking
+
Missing Skills Detection
+
Job Recommendations
+
Training Recommendations
+
Database
+
Frontend
+
Backend
+
AI Service
+
Testing
+
Docker
```
