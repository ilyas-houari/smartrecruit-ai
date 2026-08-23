# SmartRecruit AI

AI-Based Intelligent Recruitment Platform — PFE 2026

## Project Overview

SmartRecruit AI is an intelligent recruitment platform that helps candidates and recruiters through CV analysis, job matching, candidate ranking, and personalized recommendations.

## Main Features

### Candidate
- Account and profile management
- CV upload (PDF / DOCX)
- Automatic CV analysis
- Job search and applications
- Job matching score
- Missing skills detection
- Job recommendations
- Training recommendations

### Recruiter
- Company management
- Job offer management
- Required skills definition
- Applicant management
- Automatic candidate ranking
- Matching score visualization

### Admin
- User management
- Company management
- Job management
- Training management
- Platform monitoring

## Technology Stack

### Frontend
- Angular
- TypeScript
- HTML / CSS

### Backend
- Java
- Spring Boot
- Spring Security
- JWT
- Spring Data JPA

### AI Service
- Python
- FastAPI
- spaCy
- NLP

### Database
- MySQL

### DevOps
- Git / GitHub
- Docker
- Docker Compose

## Architecture

Angular Frontend
        |
        | REST API
        v
Spring Boot Backend
        |
        +---- MySQL Database
        |
        +---- FastAPI AI Service
                  |
                  +---- CV Analysis
                  +---- NLP
                  +---- Matching
                  +---- Recommendations

## Project Structure

smartrecruit-ai/
- frontend/     → Angular application
- backend/      → Spring Boot REST API
- ai-service/   → Python / FastAPI AI service
- database/     → MySQL scripts and seed data
- docs/         → Project documentation

## Core Workflow

Recruiter creates a job
→ Candidate uploads CV
→ AI analyzes CV
→ Candidate applies
→ Matching score is calculated
→ Missing skills are detected
→ Recruiter sees candidate ranking
→ Candidate receives recommendations

## Matching Strategy

- Skills: 50%
- Experience: 30%
- Education: 20%

## Git Workflow

- `main` → Stable version
- `develop` → Integration and development version
- Feature branches → Individual development work

Do not push unfinished work directly to `main`.

## Team

PFE 2026 — Computer Engineering
