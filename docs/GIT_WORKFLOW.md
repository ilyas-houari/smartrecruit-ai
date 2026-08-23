# Git Workflow — SmartRecruit AI

## Main Branches

### main
Stable version of the project.

Do not push directly to `main`.

### develop
Main development and integration branch.

Completed features are merged into `develop` before `main`.

---

## Development Workflow

Each developer creates a feature branch from `develop`.

Examples:

- `feature/frontend`
- `feature/backend`
- `feature/ai`
- `feature/database`

For specific features, use:

- `feature/backend-auth`
- `feature/backend-jobs`
- `feature/ai-cv-analysis`
- `feature/frontend-dashboard`

---

## Before Starting Work

Always get the latest version:

```bash
git checkout develop
git pull origin develop
