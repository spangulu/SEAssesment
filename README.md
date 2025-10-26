# SEAssesment

UI & API Automation Framework

This project contains **Playwright-based automation** for both **UI (BBC Sports)** and **REST Countries API**, integrated with **Cucumber BDD and Allure Reporting**, and **Jenkins CI Pipeline**.

---

## 📁 Project Structure

```plaintext
automation/
│
├── bbc-automation/ # UI automation (Cucumber + Playwright)
│   ├── pages/ # Page Object Models
│   ├── steps/ # Step Definitions
│   ├── tests/features/ # Cucumber Feature Files
│   ├── support/ # Hooks & Config
│   ├── reports/ # Cucumber JSON Reports
│   └── package.json
│
└── restcountries-api-tests/ # API test automation (Playwright API)
    ├── tests/ # API Test Specs
    ├── schema/ # JSON Schema Validators
    ├── allure-results/ # Raw Allure Results Output
    ├── playwright-report/ # Playwright HTML Execution Report
    └── package.json
```

---

## 🧰 Technology Stack

| Layer              | Tools / Frameworks          |
|--------------------|-----------------------------|
| UI Testing         | Playwright + Cucumber (BDD) |
| API Testing        | Playwright API Testing      |
| Language           | TypeScript                  |
| Node Version       | **NodeJS 22** (Configured in Jenkins) |
| Assertions         | Playwright Expect           |
| UI Reporting       | Cucumber HTML Reports       |
| API Reporting      | Allure Reports              |
| CI/CD              | Jenkins Pipeline            |

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone [https://github.com/spangulu/SEAssesment.git]
npm run install:all
```

### 2️⃣ Running Tests Locally

- ✅ **Run UI Tests (BBC Website)**: `npm run test:bbc`
- ✅ **Run API Tests (REST Countries API)**: `npm run test:api`

---

### 📊 Reports

#### Cucumber UI Test Report

![Cucumber UI Test Report](/AssessmentTest/Images/CucumberReport.png)

#### Allure API Test Report

![Allure API Test Report](/AssessmentTest/Images/AllureReportForAPI.png)

---

### 🛠️ Jenkins Pipeline Overview
## 🔗 Jenkins Pipeline Access

The Jenkins CI pipeline has been made available for reviewing the automated build and test execution process.

**Jenkins URL:**  
https://tisha-staminal-elsa.ngrok-free.dev

**Login Credentials:**  
- **Username:** `Tempuser`  
- **Password:** `Assessment@0538`

This account is configured with **limited access (read + build only)**. It allows you to:
- Trigger the pipeline
- Monitor the build logs
- View and download the generated test reports

### ⏱ Access Window
The Jenkins environment will be accessible **Monday–Friday, between 8:30 AM and 5:00 PM (SAST)** while the host machine is online.  
If access is required outside of these hours, please reach out and I will re-enable the secure tunnel.

#### Pipeline Diagram

![Jenkins Pipeline Diagram](/AssessmentTest/Images/JenkinsPipeLine.png)

#### Pipeline Steps

- Checkout Source Code
- Install Dependencies
- Run UI Tests (pipeline continues even if failed)
- Publish Cucumber HTML UI Report
- Run API Tests (pipeline continues even if failed)
- Publish Allure Report for API tests
- Clean Workspace

#### Jenkins Requirements

| Plugin / Tool          | Purpose                     |
|------------------------|-----------------------------|
| NodeJS Plugin          | Configure NodeJS 22         |
| Cucumber Reports Plugin| UI test reporting           |
| Allure Jenkins Plugin  | API report publishing       |

## ❗ Test Failures Observed
The following test scenarios are currently failing based on the data returned or validated during execution. These failures indicate mismatches between the expected results defined in the scenarios and the actual data available at runtime.

### 🏁 Grand Prix Results Scenario
The scenario expects **George Russell** to have finished **2nd** in the 2023 Las Vegas Grand Prix.  
However, the actual race results differ, which causes this test to fail.  
This reflects that:
- The expected podium data does not match the real results
### 🇿🇦 South African Sign Language (SASL) Scenario
The scenario expects **SASL** to be listed as one of South Africa’s official languages.  
The API response used during validation does not include SASL, resulting in a failed assertion.  
This indicates that:
- The expected language list and API data are not aligned


