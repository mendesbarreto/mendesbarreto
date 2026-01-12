# AGENTS.md

This is a personal portfolio repository containing markdown documentation and automated workflows. No build/test/lint commands are needed as this repository contains only markdown files and GitHub Actions.

## Repository Overview

This repository hosts personal documentation including:
- **README.md** - Main GitHub profile page
- **CV.md** - Curriculum vitae in Markdown format
- **CV.pdf** - Auto-generated PDF from CV.md
- **devcard.svg** - Auto-generated developer activity card

## Available Workflows

### Generate PDF from Markdown
- Triggered by: Push to master branch (excluding commits with `[skip ci]`)
- Command: `md-to-pdf CV.md --launch-options='{ "args": ["--no-sandbox"] }'`
- Manually run via: GitHub Actions > "Generate CV in PDF" > "Run workflow"
- Skips commits containing `[skip ci]` in the commit message

### Generate Dev Card
- Triggered by: Push to main branch, daily schedule (cron: "0 0 * * *"), or manual dispatch
- Generates: devcard.svg via daily.dev action
- Manually run via: GitHub Actions > "Generate Dev Card" > "Run workflow"

## Content Guidelines

### Markdown Files
- Use GitHub Flavored Markdown (GFM)
- For CV.md: Maintain professional formatting, use consistent heading levels (h1, h2, h3)
- Use relative paths for images (e.g., `imgs/profile.jpg`)
- Follow existing formatting patterns in existing markdown files
- Update CV.md when content needs changing; PDF will auto-generate on push

### Commit Messages
- Use conventional commit format when applicable (e.g., `chore:`, `docs:`, `feat:`)
- Add `[skip ci]` to commit message to skip PDF generation if not needed
- Example: `chore: Update contact info [skip ci]`

### Image Assets
- Store images in `imgs/` directory
- Use appropriate filenames (e.g., `profile.jpg`)
- Images are referenced relatively in markdown files

## No Traditional Build Process

This repository does not contain:
- Build scripts (npm run build, make, etc.)
- Test commands (npm test, pytest, etc.)
- Linting/formatters (eslint, prettier, etc.)
- Type checking (tsc, mypy, etc.)

Content changes are simply committed and pushed to the repository. GitHub Actions handle PDF generation automatically.
