# SEAssesment
UI & API Automation Framework

This project contains **Playwright-based automation** for both **UI (BBC Sports)** and **REST Countries API**, integrated with **Cucumber BDD**, **Allure Reporting**, and **Jenkins CI Pipeline**.

---

## 📁 Project Structure
automation/
│
├── bbc-automation/ # UI automation (Cucumber + Playwright)
│ ├── pages/ # Page Object Models
│ ├── steps/ # Step Definitions
│ ├── tests/features/ # Cucumber Feature Files
│ ├── support/ # Hooks & Config
│ ├── reports/ # Cucumber JSON Reports
│ └── package.json
│
└── restcountries-api-tests/ # API test automation (Playwright API)
├── tests/ # API Test Specs
├── schema/ # JSON Schema Validators
├── allure-results/ # Raw Allure Results Output
├── playwright-report/ # Playwright HTML Execution Report
└── package.json


---

## 🧰 Technology Stack

| Layer              | Tools / Frameworks |
|-------------------|-------------------|
| UI Testing         | Playwright + Cucumber (BDD) |
| API Testing        | Playwright API Testing |
| Language           | TypeScript |
| Node Version       | **NodeJS 22** (Configured in Jenkins) |
| Assertions         | Playwright Expect |
| UI Reporting       | Cucumber HTML Reports |
| API Reporting      | Allure Reports |
| CI/CD              | Jenkins Pipeline |

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
npm run install:all
#Running Tests Locally
✅ Run UI Tests (BBC Website)  -npm run test:bbc
✅ Run API Tests (REST Countries API) -npm run test:api

**### Reports**
**Cucumber UI Test Report **-automation/bbc-automation/reports/cucumber-report.json
<img width="1914" height="943" alt="image" src="https://github.com/user-attachments/assets/ee46a8d9-2542-4842-9e19-870256425551" />

**Allure API Test Report **-cd automation/restcountries-api-tests
<img width="1919" height="886" alt="image" src="https://github.com/user-attachments/assets/2757edeb-0d8e-41aa-b4f3-0dc4eb4c91b9" />

**Pipeline performs the following:**
<img width="1918" height="938" alt="image" src="https://github.com/user-attachments/assets/60be1222-a902-4775-bab6-d1d819a209b6" />
<img width="1915" height="773" alt="image" src="https://github.com/user-attachments/assets/59d35dc8-1bbe-4527-87f3-c813f4c2dc36" />

Checkout Source Code
Install Dependencies
Run UI Tests (pipeline continues even if failed)
Publish Cucumber HTML UI Report
Run API Tests (pipeline continues even if failed)
Publish Allure Report for API tests
Clean Workspace

**Jenkins Requirements:**
Plugin / Tool	Purpose
NodeJS Plugin	Configure NodeJS 22
Cucumber Reports Plugin	UI test reporting
Allure Jenkins Plugin	API report publishing


