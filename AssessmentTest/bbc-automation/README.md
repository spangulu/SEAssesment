# BBC Sports Automation Framework 🏎️

Playwright + TypeScript + Cucumber (BDD) framework with Jenkins-ready CI.

## Features
- POM structure, reusable utilities
- Robust hooks with screenshots on failure
- Cucumber JSON + HTML reports
- Jenkinsfile pipeline
- Optional Docker image for consistent runtime
- Environment-driven config via `BASE_URL`

## Install & Run
```bash
npm ci
npm run test:report
npm run report:generate
# View: reports/cucumber-report.html
```

## Env
Set `BASE_URL` (defaults to https://www.bbc.com/sport). Copy `.env.example` to `.env` if desired.

## Scenarios
1. Validate Las Vegas GP (2023) top 3.
2. Ensure at least 4 results for "Sport in 2023".

## Jenkins
Use the provided `Jenkinsfile`. Install the **HTML Publisher** plugin. Artifacts and reports are archived and published automatically.

## Docker
```bash
docker build -t bbc-automation .
docker run --rm bbc-automation
```
