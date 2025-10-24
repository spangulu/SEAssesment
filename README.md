# SEAssesment

UI & API Automation Framework

This project contains **Playwright-based automation** for both **UI (BBC Sports)** and **REST Countries API**, integrated with **Cucumber BDD**, **Allure Reporting**, and **Jenkins CI Pipeline**.

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
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
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


