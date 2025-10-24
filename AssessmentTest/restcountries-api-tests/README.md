
# RestCountries API Playwright Tests

Automated API tests for <https://restcountries.com/v3.1/> using Playwright (TypeScript) and Ajv for schema validation.

## Quick Start

```bash
npm install
npx playwright install
npx playwright test
```

## What’s Included?

- Schema validation (Ajv)
- Country count & region breakdown
- Language checks (e.g. South African Sign Language)

## Project Structure

- `src/api/restCountriesApi.ts` – API client (POM)
- `tests/` – All test scenarios
- `schema/` – JSON schema for validation
- `reports/` – HTML test reports

## View Results

```bash
npx playwright show-report
```

