# Git Workflow — SmartRecruit AI

This document defines the Git and GitHub workflow used by the SmartRecruit AI team.

---

## 1. Main Branches

### `main`

Stable version of the project.

- Contains tested and stable code.
- Do not push unfinished work directly to `main`.
- `develop` will be merged into `main` when a stable version is ready.

### `develop`

Main development and integration branch.

- All completed features are merged into `develop`.
- Team integration and testing are done here.
- Developers create their feature branches from `develop`.

---

## 2. Feature Branches

Each developer works on a separate feature branch created from `develop`.

Examples:

```text
feature/frontend
feature/backend
feature/ai
feature/database
```

For specific tasks, use more precise names:

```text
feature/frontend-login
feature/frontend-dashboard

feature/backend-auth
feature/backend-jobs
feature/backend-applications

feature/ai-cv-analysis
feature/ai-matching

feature/database-schema
```

---

## 3. Before Starting Work

Always get the latest version of `develop`:

```bash
git checkout develop
git pull origin develop
```

Then create a new branch for your task:

```bash
git checkout -b feature/your-feature
```

Example:

```bash
git checkout -b feature/backend-auth
```

---

## 4. Save Your Work

Check modified files:

```bash
git status
```

Add your changes:

```bash
git add .
```

Create a commit:

```bash
git commit -m "feat: add authentication API"
```

Push your branch to GitHub:

```bash
git push origin feature/backend-auth
```

Replace `feature/backend-auth` with your actual branch name.

---

## 5. Commit Messages

Use short and clear commit messages.

### New Feature

```text
feat: add candidate registration
feat: add CV upload
feat: add job creation API
feat: add matching endpoint
```

### Bug Fix

```text
fix: fix login validation
fix: fix database connection
fix: fix CV upload error
```

### Documentation

```text
docs: update API contracts
docs: update database design
```

### Tests

```text
test: add authentication tests
test: add matching tests
```

Avoid unclear commit messages such as:

```text
update
changes
test
final
final2
new
```

---

## 6. Pull Requests

When a feature is completed:

1. Test your feature.
2. Commit your changes.
3. Push your feature branch to GitHub.
4. Open the repository on GitHub.
5. Create a Pull Request.
6. Select `develop` as the target branch.
7. Review the changes.
8. Merge the Pull Request after verification.

Workflow:

```text
Feature Branch
      ↓
Pull Request
      ↓
develop
      ↓
Integration & Testing
      ↓
main
```

---

## 7. Updating Your Feature Branch

If other developers have added new changes to `develop`, update your local repository before continuing.

```bash
git checkout develop
git pull origin develop
```

Then return to your feature branch:

```bash
git checkout feature/your-feature
```

Merge the latest `develop`:

```bash
git merge develop
```

Resolve any conflicts carefully before continuing.

---

## 8. Project Rules

1. Never push unfinished code directly to `main`.
2. Use `develop` for project integration.
3. Create feature branches from `develop`.
4. One branch should have one clear purpose.
5. Pull the latest `develop` regularly.
6. Use clear commit messages.
7. Test your work before creating a Pull Request.
8. Never commit passwords, tokens, API keys or secrets.
9. Never commit `.env` files.
10. Do not change database structure without informing the team.
11. Do not change API contracts without informing the team.
12. Resolve Git conflicts carefully before merging.
13. Do not delete another developer's code without team agreement.

---

## 9. Team Branch Structure

```text
main
  ↑
develop
  ↑
  ├── feature/frontend-...
  ├── feature/backend-...
  ├── feature/ai-...
  └── feature/database-...
```

### Branch Roles

```text
main        = Stable project
develop     = Development and integration
feature/*   = Individual features and tasks
```

---

## 10. Example — Backend Developer

The Backend developer wants to implement authentication.

First:

```bash
git checkout develop
git pull origin develop
```

Create the branch:

```bash
git checkout -b feature/backend-auth
```

Work on the authentication feature.

Then:

```bash
git status
git add .
git commit -m "feat: add JWT authentication"
git push origin feature/backend-auth
```

Finally:

```text
GitHub
   ↓
Create Pull Request
   ↓
feature/backend-auth → develop
   ↓
Review
   ↓
Merge
```

---

## 11. Example — AI Developer

The AI developer wants to implement CV analysis.

```bash
git checkout develop
git pull origin develop

git checkout -b feature/ai-cv-analysis
```

After completing the feature:

```bash
git add .
git commit -m "feat: add CV analysis service"
git push origin feature/ai-cv-analysis
```

Then create a Pull Request:

```text
feature/ai-cv-analysis → develop
```

---

## 12. Important Security Rule

Never upload sensitive information to GitHub.

Do not commit:

```text
Database passwords
JWT secrets
API keys
Private tokens
.env files
Personal credentials
```

Use environment variables instead.

Example:

```text
DB_USERNAME=root
DB_PASSWORD=your_password
JWT_SECRET=your_secret
AI_SERVICE_URL=http://localhost:8000
```

Real values must stay local and must not be committed to GitHub.

---

## Final Workflow

```text
Get latest develop
        ↓
Create feature branch
        ↓
Develop the feature
        ↓
Test
        ↓
Commit
        ↓
Push
        ↓
Pull Request
        ↓
Merge into develop
        ↓
Integration test
        ↓
Stable release
        ↓
Merge develop into main
```
