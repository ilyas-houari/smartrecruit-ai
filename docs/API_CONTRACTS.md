# SmartRecruit AI — API Contracts

## 1. Purpose

This document defines the official communication contracts between:

```text
Angular Frontend
        ↕
Spring Boot Backend
        ↕
FastAPI AI Service
        ↕
Spring Boot
        ↕
MySQL
```

All developers must use the same:

- Endpoint names
- JSON field names
- Request formats
- Response formats
- Status values
- Error formats
- AI input/output formats

Any important contract change must be communicated to the team.

---

# 2. Base URLs

## Spring Boot Backend

```text
http://localhost:8080/api
```

Example:

```text
http://localhost:8080/api/auth/login
```

## FastAPI AI Service

```text
http://localhost:8000/ai
```

Example:

```text
http://localhost:8000/ai/analyze-cv
```

Important:

```text
Angular → Spring Boot
Spring Boot → FastAPI
```

Angular should not communicate directly with the AI service.

---

# 3. General Conventions

## JSON Naming

Use camelCase:

```json
{
  "firstName": "Ahmed",
  "lastName": "Alami",
  "totalExperienceMonths": 24
}
```

Do not mix formats such as:

```text
first_name
FirstName
firstname
prenom
```

---

## IDs

IDs are numeric.

Example:

```json
{
  "id": 1
}
```

Backend Java type:

```text
Long
```

Database type:

```text
BIGINT
```

---

## Dates

Date:

```text
YYYY-MM-DD
```

Example:

```text
2026-08-23
```

Date and time responses use ISO format.

Example:

```text
2026-08-23T14:30:00
```

---

# 4. Roles

Official role values:

```text
ADMIN
CANDIDATE
RECRUITER
```

Do not use alternative values such as:

```text
USER
HR
EMPLOYER
JOB_SEEKER
```

unless the team officially changes the contract.

---

# 5. User Status

```text
ACTIVE
INACTIVE
SUSPENDED
```

---

# 6. Authentication

# 6.1 Register Candidate

```text
POST /api/auth/register
```

Request:

```json
{
  "firstName": "Ahmed",
  "lastName": "Alami",
  "email": "ahmed@gmail.com",
  "password": "Test1234!",
  "phone": "0612345678",
  "role": "CANDIDATE"
}
```

Successful response:

```json
{
  "id": 1,
  "firstName": "Ahmed",
  "lastName": "Alami",
  "email": "ahmed@gmail.com",
  "role": "CANDIDATE",
  "status": "ACTIVE",
  "message": "Registration successful"
}
```

---

# 6.2 Register Recruiter

```text
POST /api/auth/register
```

Request:

```json
{
  "firstName": "Sara",
  "lastName": "Bennani",
  "email": "sara@company.com",
  "password": "Test1234!",
  "phone": "0623456789",
  "role": "RECRUITER"
}
```

Response follows the same registration structure.

---

# 6.3 Login

```text
POST /api/auth/login
```

Request:

```json
{
  "email": "ahmed@gmail.com",
  "password": "Test1234!"
}
```

Response:

```json
{
  "token": "JWT_TOKEN",
  "tokenType": "Bearer",
  "user": {
    "id": 1,
    "firstName": "Ahmed",
    "lastName": "Alami",
    "email": "ahmed@gmail.com",
    "role": "CANDIDATE"
  }
}
```

---

# 6.4 Current User

```text
GET /api/auth/me
```

Header:

```text
Authorization: Bearer JWT_TOKEN
```

Response:

```json
{
  "id": 1,
  "firstName": "Ahmed",
  "lastName": "Alami",
  "email": "ahmed@gmail.com",
  "phone": "0612345678",
  "role": "CANDIDATE",
  "status": "ACTIVE"
}
```

---

# 7. Candidate Profile

# 7.1 Get Current Candidate

```text
GET /api/candidates/me
```

Response:

```json
{
  "id": 1,
  "userId": 1,
  "firstName": "Ahmed",
  "lastName": "Alami",
  "email": "ahmed@gmail.com",
  "phone": "0612345678",
  "city": "Casablanca",
  "country": "Morocco",
  "bio": "Java backend developer",
  "linkedinUrl": "https://example.com/linkedin",
  "githubUrl": "https://example.com/github",
  "portfolioUrl": null,
  "totalExperienceMonths": 24,
  "highestEducationLevel": "BAC_3",
  "profileCompleted": true,
  "skills": [
    {
      "id": 1,
      "name": "Java",
      "level": "ADVANCED"
    },
    {
      "id": 2,
      "name": "Spring Boot",
      "level": "INTERMEDIATE"
    }
  ]
}
```

---

# 7.2 Update Candidate

```text
PUT /api/candidates/me
```

Request:

```json
{
  "city": "Casablanca",
  "country": "Morocco",
  "bio": "Java backend developer",
  "linkedinUrl": "https://example.com/linkedin",
  "githubUrl": "https://example.com/github",
  "portfolioUrl": null
}
```

---

# 8. Candidate Skills

## Skill Levels

```text
BEGINNER
INTERMEDIATE
ADVANCED
EXPERT
```

## Skill Sources

```text
CV
MANUAL
AI
```

Skill object:

```json
{
  "id": 1,
  "name": "Java",
  "category": "Programming Language",
  "level": "ADVANCED",
  "source": "CV",
  "confidenceScore": 95.0
}
```

---

# 9. Candidate Experience

Experience object:

```json
{
  "id": 1,
  "jobTitle": "Backend Developer",
  "companyName": "ABC Company",
  "description": "Development of REST APIs",
  "startDate": "2024-01-01",
  "endDate": "2026-01-01",
  "isCurrent": false,
  "durationMonths": 24,
  "source": "CV"
}
```

---

# 10. Candidate Education

Education levels:

```text
NONE
BAC
BAC_2
BAC_3
MASTER
ENGINEERING
PHD
OTHER
```

Education object:

```json
{
  "id": 1,
  "degree": "Bachelor in Computer Science",
  "field": "Computer Science",
  "institution": "Example University",
  "startYear": 2021,
  "endYear": 2024,
  "level": "BAC_3",
  "source": "CV"
}
```

---

# 11. Company

# 11.1 Company Object

```json
{
  "id": 1,
  "name": "Tech Solutions",
  "description": "Software development company",
  "website": "https://example.com",
  "city": "Casablanca",
  "country": "Morocco",
  "industry": "Software",
  "logoUrl": null,
  "status": "ACTIVE"
}
```

---

# 11.2 Create Company

```text
POST /api/companies
```

Request:

```json
{
  "name": "Tech Solutions",
  "description": "Software development company",
  "website": "https://example.com",
  "city": "Casablanca",
  "country": "Morocco",
  "industry": "Software"
}
```

---

# 11.3 Update Company

```text
PUT /api/companies/{id}
```

---

# 12. Recruiter

# 12.1 Current Recruiter

```text
GET /api/recruiters/me
```

Response:

```json
{
  "id": 1,
  "userId": 2,
  "firstName": "Sara",
  "lastName": "Bennani",
  "email": "sara@company.com",
  "companyId": 1,
  "companyName": "Tech Solutions",
  "position": "HR Manager"
}
```

---

# 12.2 Update Recruiter

```text
PUT /api/recruiters/me
```

Request:

```json
{
  "position": "HR Manager"
}
```

---

# 13. Job Offers

## Work Modes

```text
ONSITE
REMOTE
HYBRID
```

## Contract Types

```text
CDI
CDD
INTERNSHIP
FREELANCE
PART_TIME
OTHER
```

## Job Status

```text
DRAFT
PUBLISHED
CLOSED
ARCHIVED
```

---

# 13.1 Job Object

```json
{
  "id": 10,
  "title": "Java Backend Developer",
  "description": "We are looking for a Java Backend Developer.",
  "company": {
    "id": 1,
    "name": "Tech Solutions"
  },
  "location": "Casablanca",
  "workMode": "HYBRID",
  "contractType": "CDI",
  "requiredExperienceYears": 2.0,
  "requiredEducationLevel": "BAC_3",
  "salaryMin": 8000,
  "salaryMax": 12000,
  "status": "PUBLISHED",
  "publishedAt": "2026-08-23T12:00:00",
  "deadline": "2026-09-30",
  "skills": [
    {
      "id": 1,
      "name": "Java",
      "requiredLevel": "INTERMEDIATE",
      "mandatory": true,
      "weight": 30
    },
    {
      "id": 2,
      "name": "Spring Boot",
      "requiredLevel": "INTERMEDIATE",
      "mandatory": true,
      "weight": 30
    },
    {
      "id": 3,
      "name": "MySQL",
      "requiredLevel": "INTERMEDIATE",
      "mandatory": true,
      "weight": 20
    },
    {
      "id": 4,
      "name": "Docker",
      "requiredLevel": "BEGINNER",
      "mandatory": true,
      "weight": 20
    }
  ]
}
```

---

# 13.2 List Published Jobs

```text
GET /api/jobs
```

Optional query parameters:

```text
?page=0
&size=10
&search=java
&location=Casablanca
&workMode=HYBRID
&contractType=CDI
```

Example:

```text
GET /api/jobs?page=0&size=10&search=java
```

Response:

```json
{
  "content": [
    {
      "id": 10,
      "title": "Java Backend Developer",
      "companyName": "Tech Solutions",
      "location": "Casablanca",
      "workMode": "HYBRID",
      "contractType": "CDI",
      "requiredExperienceYears": 2.0,
      "status": "PUBLISHED"
    }
  ],
  "page": 0,
  "size": 10,
  "totalElements": 1,
  "totalPages": 1
}
```

---

# 13.3 Get Job Details

```text
GET /api/jobs/{id}
```

Response:

Use the complete Job Object defined above.

---

# 13.4 Create Job

Role:

```text
RECRUITER
```

Endpoint:

```text
POST /api/jobs
```

Request:

```json
{
  "title": "Java Backend Developer",
  "description": "We are looking for a Java Backend Developer.",
  "location": "Casablanca",
  "workMode": "HYBRID",
  "contractType": "CDI",
  "requiredExperienceYears": 2.0,
  "requiredEducationLevel": "BAC_3",
  "salaryMin": 8000,
  "salaryMax": 12000,
  "deadline": "2026-09-30",
  "skills": [
    {
      "skillId": 1,
      "requiredLevel": "INTERMEDIATE",
      "mandatory": true,
      "weight": 30
    },
    {
      "skillId": 2,
      "requiredLevel": "INTERMEDIATE",
      "mandatory": true,
      "weight": 30
    }
  ]
}
```

---

# 13.5 Update Job

```text
PUT /api/jobs/{id}
```

Role:

```text
RECRUITER
```

A recruiter can modify only jobs belonging to their company/ownership according to Backend authorization rules.

---

# 13.6 Delete / Archive Job

```text
DELETE /api/jobs/{id}
```

Role:

```text
RECRUITER
```

For production behavior, prefer safe archive/close behavior when the job already has applications.

---

# 13.7 Close Job

```text
PATCH /api/jobs/{id}/close
```

---

# 14. CV Management

## File Types

Supported:

```text
PDF
DOCX
```

## Analysis Status

```text
UPLOADED
PROCESSING
ANALYZED
VALIDATED
FAILED
```

---

# 14.1 Upload CV

```text
POST /api/cv/upload
```

Content-Type:

```text
multipart/form-data
```

Form field:

```text
file
```

Response:

```json
{
  "id": 1,
  "fileName": "ahmed_cv.pdf",
  "fileType": "PDF",
  "analysisStatus": "UPLOADED",
  "uploadedAt": "2026-08-23T14:30:00"
}
```

---

# 14.2 Analyze CV

```text
POST /api/cv/{id}/analyze
```

Flow:

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

Response:

```json
{
  "cvId": 1,
  "analysisStatus": "ANALYZED",
  "candidateProfile": {
    "name": "Ahmed Alami",
    "email": "ahmed@gmail.com",
    "skills": [
      "Java",
      "Spring Boot",
      "MySQL",
      "Git"
    ],
    "totalExperienceMonths": 24,
    "educationLevel": "BAC_3"
  }
}
```

---

# 14.3 Get CV Analysis

```text
GET /api/cv/{id}/analysis
```

---

# 14.4 Validate Extracted Profile

Candidate must be able to review/correct automatically extracted information before final validation.

```text
PUT /api/cv/{id}/validate
```

This allows AI extraction errors to be corrected by the candidate.

---

# 15. Applications

## Application Status

```text
SUBMITTED
UNDER_REVIEW
SHORTLISTED
ACCEPTED
REJECTED
WITHDRAWN
```

---

# 15.1 Apply for Job

Role:

```text
CANDIDATE
```

Endpoint:

```text
POST /api/jobs/{jobId}/apply
```

Request:

```json
{
  "coverLetter": "I am interested in this position."
}
```

Response:

```json
{
  "id": 100,
  "candidateId": 1,
  "jobOfferId": 10,
  "status": "SUBMITTED",
  "appliedAt": "2026-08-23T15:00:00"
}
```

A candidate cannot apply more than once to the same job.

---

# 15.2 Candidate Applications

```text
GET /api/applications/me
```

Response:

```json
[
  {
    "id": 100,
    "jobOfferId": 10,
    "jobTitle": "Java Backend Developer",
    "companyName": "Tech Solutions",
    "status": "SUBMITTED",
    "appliedAt": "2026-08-23T15:00:00",
    "finalScore": 87.5
  }
]
```

---

# 15.3 Job Applicants

Role:

```text
RECRUITER
```

Endpoint:

```text
GET /api/jobs/{jobId}/applicants
```

Response:

```json
[
  {
    "applicationId": 100,
    "candidateId": 1,
    "candidateName": "Ahmed Alami",
    "status": "UNDER_REVIEW",
    "finalScore": 87.5
  }
]
```

---

# 15.4 Update Application Status

```text
PATCH /api/applications/{id}/status
```

Request:

```json
{
  "status": "SHORTLISTED"
}
```

---

# 15.5 Withdraw Application

Role:

```text
CANDIDATE
```

Endpoint:

```text
PATCH /api/applications/{id}/withdraw
```

---

# 16. Matching

Official matching weights:

```text
Skills      50%
Experience  30%
Education   20%
```

Formula:

```text
Final Score =
(skillScore × 0.50)
+
(experienceScore × 0.30)
+
(educationScore × 0.20)
```

All scores:

```text
0 → 100
```

---

# 16.1 Matching Result

```json
{
  "applicationId": 100,
  "skillScore": 75.0,
  "experienceScore": 100.0,
  "educationScore": 100.0,
  "finalScore": 87.5,
  "missingSkills": [
    {
      "id": 4,
      "name": "Docker",
      "importance": "HIGH"
    }
  ],
  "explanation": "Candidate matches most required skills but Docker is missing."
}
```

---

# 16.2 Get Application Matching

```text
GET /api/applications/{id}/matching
```

---

# 17. Candidate Ranking

Role:

```text
RECRUITER
```

Endpoint:

```text
GET /api/jobs/{jobId}/ranking
```

Candidates must be ordered by final matching score, highest first.

Response:

```json
[
  {
    "rank": 1,
    "applicationId": 101,
    "candidateId": 2,
    "candidateName": "Sara Benali",
    "finalScore": 94.0,
    "status": "SHORTLISTED"
  },
  {
    "rank": 2,
    "applicationId": 100,
    "candidateId": 1,
    "candidateName": "Ahmed Alami",
    "finalScore": 87.5,
    "status": "UNDER_REVIEW"
  },
  {
    "rank": 3,
    "applicationId": 102,
    "candidateId": 3,
    "candidateName": "Youssef Karim",
    "finalScore": 81.0,
    "status": "SUBMITTED"
  }
]
```

---

# 18. Missing Skills

Importance:

```text
LOW
MEDIUM
HIGH
CRITICAL
```

Example:

```json
[
  {
    "skillId": 4,
    "skillName": "Docker",
    "importance": "HIGH"
  },
  {
    "skillId": 7,
    "skillName": "Kubernetes",
    "importance": "MEDIUM"
  }
]
```

---

# 19. Training

## Training Level

```text
BEGINNER
INTERMEDIATE
ADVANCED
ALL_LEVELS
```

Training object:

```json
{
  "id": 1,
  "title": "Docker Fundamentals",
  "description": "Introduction to Docker.",
  "provider": "SmartRecruit Training Catalog",
  "url": null,
  "level": "BEGINNER",
  "durationHours": 8,
  "isFree": true,
  "skills": [
    "Docker"
  ]
}
```

---

# 20. Job Recommendations

Role:

```text
CANDIDATE
```

Endpoint:

```text
GET /api/recommendations/jobs
```

Response:

```json
[
  {
    "jobOfferId": 10,
    "title": "Java Backend Developer",
    "companyName": "Tech Solutions",
    "recommendationScore": 87.5,
    "reason": "Strong match with Java and Spring Boot skills."
  },
  {
    "jobOfferId": 11,
    "title": "Spring Boot Developer",
    "companyName": "Digital Systems",
    "recommendationScore": 83.0,
    "reason": "Good backend skill compatibility."
  }
]
```

---

# 21. Training Recommendations

```text
GET /api/recommendations/trainings
```

Response:

```json
[
  {
    "trainingId": 1,
    "title": "Docker Fundamentals",
    "provider": "SmartRecruit Training Catalog",
    "recommendationScore": 95.0,
    "targetSkill": "Docker",
    "reason": "Docker is missing from your profile and required by matching jobs."
  }
]
```

---

# 22. FastAPI AI Contracts

These endpoints are internal.

Frontend must NOT call them directly.

```text
Spring Boot → FastAPI
```

---

# 22.1 AI Health Check

```text
GET /ai/health
```

Response:

```json
{
  "status": "UP"
}
```

This endpoint can be used by Backend/integration tests to verify that the AI service is available.

---

# 22.2 AI CV Analysis

```text
POST /ai/analyze-cv
```

Spring Boot sends the CV to FastAPI.

Content-Type:

```text
multipart/form-data
```

Field:

```text
file
```

AI response:

```json
{
  "name": "Ahmed Alami",
  "email": "ahmed@gmail.com",
  "skills": [
    "Java",
    "Spring Boot",
    "MySQL",
    "Git"
  ],
  "technologies": [
    "Java",
    "Spring Boot",
    "MySQL",
    "Git"
  ],
  "experiences": [
    {
      "jobTitle": "Backend Developer",
      "companyName": "ABC Company",
      "startDate": "2024-01-01",
      "endDate": "2026-01-01",
      "isCurrent": false,
      "durationMonths": 24
    }
  ],
  "educations": [
    {
      "degree": "Bachelor in Computer Science",
      "field": "Computer Science",
      "institution": "Example University",
      "level": "BAC_3"
    }
  ],
  "totalExperienceMonths": 24,
  "highestEducationLevel": "BAC_3"
}
```

Important:

AI returns extracted information.

Spring Boot is responsible for validating and saving it in MySQL.

---

# 22.3 AI Matching Request

```text
POST /ai/match
```

Spring Boot sends:

```json
{
  "candidate": {
    "skills": [
      "Java",
      "Spring Boot",
      "MySQL"
    ],
    "totalExperienceMonths": 24,
    "highestEducationLevel": "BAC_3"
  },
  "job": {
    "skills": [
      {
        "name": "Java",
        "mandatory": true,
        "weight": 30
      },
      {
        "name": "Spring Boot",
        "mandatory": true,
        "weight": 30
      },
      {
        "name": "MySQL",
        "mandatory": true,
        "weight": 20
      },
      {
        "name": "Docker",
        "mandatory": true,
        "weight": 20
      }
    ],
    "requiredExperienceYears": 2.0,
    "requiredEducationLevel": "BAC_3"
  }
}
```

AI response:

```json
{
  "skillScore": 75.0,
  "experienceScore": 100.0,
  "educationScore": 100.0,
  "finalScore": 87.5,
  "missingSkills": [
    {
      "name": "Docker",
      "importance": "HIGH"
    }
  ],
  "explanation": "Candidate matches 3 of 4 required skills."
}
```

---

# 23. Recommendation AI Contract

If recommendation logic is exposed through FastAPI:

```text
POST /ai/recommend
```

Example request:

```json
{
  "candidate": {
    "skills": [
      "Java",
      "Spring Boot",
      "MySQL"
    ],
    "totalExperienceMonths": 24,
    "highestEducationLevel": "BAC_3"
  },
  "missingSkills": [
    "Docker"
  ]
}
```

FastAPI returns recommendation information to Spring Boot.

Spring Boot remains responsible for exposing final recommendation APIs to Angular and for persistence when needed.

---

# 24. Error Response

Spring Boot APIs must use a consistent error structure.

Example:

```json
{
  "timestamp": "2026-08-23T15:30:00",
  "status": 400,
  "error": "Bad Request",
  "message": "Email already exists",
  "path": "/api/auth/register"
}
```

---

# 25. Common HTTP Status Codes

```text
200 OK
Request completed successfully

201 Created
Resource created successfully

204 No Content
Request completed successfully with no response body

400 Bad Request
Invalid request/data

401 Unauthorized
User is not authenticated or token is invalid

403 Forbidden
Authenticated user does not have permission

404 Not Found
Resource does not exist

409 Conflict
Duplicate/conflicting data

415 Unsupported Media Type
Unsupported CV/file type

422 Unprocessable Entity
AI/input validation error when applicable

500 Internal Server Error
Unexpected server error

503 Service Unavailable
AI service or another required service is unavailable
```

---

# 26. Validation Rules

## Registration

```text
firstName → required
lastName  → required
email     → required + valid email
password  → required
role      → CANDIDATE or RECRUITER for public registration
```

ADMIN accounts must not be created through normal public registration.

---

## Job

```text
title                       → required
description                 → required
requiredExperienceYears     → >= 0
salaryMin                   → >= 0 when provided
salaryMax                   → >= salaryMin when both provided
deadline                    → valid date
skills                      → required for meaningful matching
```

---

## CV

```text
Only PDF / DOCX
Empty files rejected
Unsupported files rejected
```

The Backend should also define an upload size limit in configuration.

---

## Matching

```text
skillScore       → 0 to 100
experienceScore  → 0 to 100
educationScore   → 0 to 100
finalScore       → 0 to 100
```

---

# 27. Authorization Rules

## Candidate

Can:

```text
Manage own profile
Upload own CV
Review/validate own extracted CV information
Browse published jobs
Apply to jobs
View own applications
Withdraw own applications
View own matching results
View own recommendations
```

Cannot:

```text
Create job offers
See private applicant lists of recruiters
Modify another candidate
Manage platform users
```

---

## Recruiter

Can:

```text
Manage own recruiter profile
Manage authorized company information
Create jobs
Update own/company-authorized jobs
View applicants for authorized jobs
View candidate ranking for authorized jobs
Update application status for authorized jobs
```

Cannot:

```text
Modify another company's jobs without authorization
Access unrelated private candidate/application data
Manage platform users as Admin
```

---

## Admin

Can manage platform-level resources according to Admin features:

```text
Users
Companies
Jobs
Trainings
Platform monitoring
```

---

# 28. Ownership Rule

Backend must never trust IDs from Frontend without authorization checks.

Example:

```text
Recruiter sends:

PUT /api/jobs/10

Backend must check:

Authenticated Recruiter
        ↓
Has permission for Job 10?
        ↓
YES → update
NO  → 403 Forbidden
```

The same principle applies to Candidate applications, CVs and profiles.

---

# 29. Password Rule

Passwords are sent only during authentication operations:

```text
Register
Login
```

Backend stores only BCrypt password hashes.

Never return password or password hash in API responses.

Never send password information to the AI service.

---

# 30. JWT Rule

Protected Angular requests send:

```text
Authorization: Bearer JWT_TOKEN
```

Flow:

```text
Login
  ↓
Backend returns JWT
  ↓
Angular stores authentication state
  ↓
Angular interceptor adds JWT
  ↓
Backend validates JWT
```

---

# 31. File Upload Rule

CV flow:

```text
Candidate
   ↓
Angular
   ↓
Spring Boot
   ↓
Validate file
   ↓
Create CV record / metadata
   ↓
FastAPI
   ↓
Extract information
   ↓
Spring Boot
   ↓
Candidate reviews/corrects extracted data
   ↓
Validation
   ↓
MySQL
```

AI service must not directly write candidate data into MySQL.

---

# 32. Matching Flow

```text
Candidate applies
       ↓
Spring Boot loads Candidate
       ↓
Spring Boot loads Job
       ↓
Spring Boot sends standardized data to FastAPI
       ↓
FastAPI calculates matching
       ↓
FastAPI returns scores + missing skills
       ↓
Spring Boot validates result
       ↓
Spring Boot stores MatchingResult
       ↓
Spring Boot stores MissingSkills
       ↓
Angular displays result/ranking
```

---

# 33. Frontend Mock Data Rule

Frontend can develop before Backend is complete.

Mock data MUST follow this document.

Example:

```typescript
const mockJob = {
  id: 10,
  title: 'Java Backend Developer',
  companyName: 'Tech Solutions',
  location: 'Casablanca',
  workMode: 'HYBRID',
  contractType: 'CDI',
  requiredExperienceYears: 2,
  status: 'PUBLISHED'
};
```

Later:

```text
Mock data
    ↓
Remove/replace source
    ↓
Angular Service
    ↓
Spring Boot API
```

Do not redesign the frontend data model when replacing mocks if the API contract has not changed.

---

# 34. API Version Rule

Current project contract:

```text
API Contract Version: 1.0
```

If an important breaking change is required:

1. Inform the team.
2. Update this document.
3. Update Backend DTOs.
4. Update Frontend models/services.
5. Update AI schemas if affected.
6. Test integration again.

---

# 35. Core API Summary

## Authentication

```text
POST  /api/auth/register
POST  /api/auth/login
GET   /api/auth/me
```

## Candidate

```text
GET   /api/candidates/me
PUT   /api/candidates/me
```

## Recruiter

```text
GET   /api/recruiters/me
PUT   /api/recruiters/me
```

## Companies

```text
POST  /api/companies
PUT   /api/companies/{id}
```

## Jobs

```text
GET     /api/jobs
GET     /api/jobs/{id}
POST    /api/jobs
PUT     /api/jobs/{id}
DELETE  /api/jobs/{id}
PATCH   /api/jobs/{id}/close
```

## CV

```text
POST  /api/cv/upload
POST  /api/cv/{id}/analyze
GET   /api/cv/{id}/analysis
PUT   /api/cv/{id}/validate
```

## Applications

```text
POST   /api/jobs/{jobId}/apply
GET    /api/applications/me
GET    /api/jobs/{jobId}/applicants
PATCH  /api/applications/{id}/status
PATCH  /api/applications/{id}/withdraw
```

## Matching

```text
GET /api/applications/{id}/matching
GET /api/jobs/{jobId}/ranking
```

## Recommendations

```text
GET /api/recommendations/jobs
GET /api/recommendations/trainings
```

## Internal AI Service

```text
GET   /ai/health
POST  /ai/analyze-cv
POST  /ai/match
POST  /ai/recommend
```

---

# 36. Core Integration Contract

The official project communication flow is:

```text
                Angular
                   |
                   | REST / JSON
                   v
              Spring Boot
              /          \
             /            \
            v              v
         MySQL          FastAPI
                          |
                          v
                     NLP / Matching
```

Rules:

```text
Angular does not access MySQL directly.

Angular does not call FastAPI directly.

FastAPI does not manage application users/authentication.

FastAPI does not directly modify the main MySQL application data.

Spring Boot is the central application API.

Spring Boot controls authentication, authorization,
business logic and persistence.

FastAPI provides AI/NLP processing.
```

---

# 37. Final Rule

This document is the official API contract for SmartRecruit AI.

Before changing:

```text
Endpoint
JSON field
Status
Role
AI input
AI output
Request structure
Response structure
```

the developer must verify the impact on:

```text
Frontend
Backend
AI
Database
```

and inform the team when the change affects another module.
