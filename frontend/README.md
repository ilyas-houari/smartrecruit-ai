# SmartRecruit AI — Frontend

Angular frontend for **SmartRecruit AI** (PFE 2026), an AI-based intelligent
recruitment platform with three roles: **Candidate**, **Recruiter**, and
**Admin**. Owned by the Frontend team member — see the project's root
`docs/` for the full team context (architecture, API contracts, DB schema).

Built with Angular 21 (standalone components, esbuild-based builder) and
Vitest for unit tests.

## Getting started

```bash
npm install
ng serve
```

Open `http://localhost:4200`. The app reloads automatically on source changes.

## Demo accounts (current mock login)

Authentication is currently mocked in `AuthService` — no backend call yet.
Any password of 6+ characters works; only the email is checked:

| Email | Role |
|---|---|
| `candidat@candidat.com` | Candidate |
| `recruteur@recruteur.com` | Recruiter |
| `admin@admin.com` | Admin |

## Project structure

```
src/app/
  core/
    guards/        authGuard (session), roleGuard (per-role access)
    interceptors/   authInterceptor (attaches Authorization: Bearer <token>)
    models/         TypeScript interfaces matching database/schema.sql
    services/       AuthService, JobService, CvService, CandidateService,
                     ApplicationService, CompanyService
  features/
    auth/           login, register
    candidate/       dashboard, profile, cv, jobs, job-details,
                     applications, recommendations
    recruiter/       dashboard, company, my-jobs, create-job, edit-job,
                     job-details, candidates, candidate-profile,
                     applications, application-details, ranking
    admin/           dashboard, users, companies, jobs, trainings
  shared/
    layouts/         app-layout (sidebar + topbar shell)
    components/      sidebar, topbar
```

Routing is role-based and guarded: `/candidate/*`, `/recruiter/*`, and
`/admin/*` each require an authenticated session (`authGuard`) with the
matching role (`roleGuard`), which redirects a wrong-role user to their own
dashboard.

## Current state: mock data vs. real APIs

Most pages currently run on **realistic mock data** shaped exactly like the
official API contract (see the root `docs/API_CONTRACTS.md` and
`database/schema.sql`), so swapping in the real backend should mean editing
services, not redesigning pages. As of now:

- **Wired to a real endpoint already** (will "just work" once the backend
  responds): candidate profile load/save, application withdraw, recruiter
  company load/save, recruiter application status changes.
- **Still fully mocked, by design:** `AuthService` (no `/api/auth/*` yet),
  `JobService` (no `/api/jobs` yet).
- **Blocked on an API contract decision:** the recruiter's aggregate
  Candidates/Applications/Ranking views need either job-scoped navigation or
  a new backend endpoint — see the team thread on this before wiring it.

`src/environments/environment.ts` holds `apiBaseUrl`
(`http://localhost:8080/api` by default) — update it there, not inline in a
service.

## Testing

```bash
ng test
```

Runs the Vitest suite: guards, the HTTP interceptor, `AuthService` (including
session-persistence behavior), and `CvService`'s mock analysis pipeline.

No end-to-end test framework is configured yet (owned by the
Database/Testing/Integration role — see the team's Git workflow doc).

## Building

```bash
ng build                                   # production
ng build --configuration development       # development
```

**Known issue:** `ng build --configuration production` currently fails —
several component styles exceed the 8&nbsp;KB per-component budget set in
`angular.json` (worst case: `cv.scss` at ~18.5&nbsp;KB). Needs a team call on
whether to raise the budget or trim those stylesheets.
