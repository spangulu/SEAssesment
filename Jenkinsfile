pipeline {
    agent any

    tools {
        nodejs "NodeJS22"   // Use the NodeJS tool actually configured in Jenkins
    }

    stages {

        /* ---------------- CHECKOUT ---------------- */
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        /* ---------------- INSTALL DEPENDENCIES ---------------- */
        stage('Install Dependencies') {
            steps {
                bat "npm run install:all"
            }
        }

        /* ---------------- BBC UI TESTS ---------------- */
        stage('Run BBC UI Tests') {
            steps {
                catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                    bat """
                        cd AssessmentTest\\bbc-automation
                        npx cucumber-js tests/features --require-module ts-node/register --require steps/**/*.ts --require support/**/*.ts --format json:reports/cucumber-report.json --format progress
                    """
                }
            }
        }

        /* ---------------- PUBLISH BBC CUCUMBER REPORT ---------------- */
        stage('Publish UI Cucumber Report') {
            steps {
                cucumber buildStatus: 'UNSTABLE', fileIncludePattern: 'AssessmentTest/bbc-automation/reports/cucumber-report.json'
            }
        }

        /* ---------------- API TESTS (Playwright + Allure) ---------------- */
        stage('Run API Tests (Allure)') {
            steps {
                catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                    bat """
                        cd AssessmentTest\\restcountries-api-tests
                        npx playwright test --reporter=line,allure-playwright
                    """
                }
            }
        }

        /* ---------------- PUBLISH ALLURE REPORT ---------------- */
        stage('Publish Allure Report') {
            steps {
                bat 'if exist AssessmentTest\\restcountries-api-tests\\allure-results xcopy /E /I /Y AssessmentTest\\restcountries-api-tests\\allure-results allure-results'
                allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]
            }
        }
    }

    /* ---------------- POST PIPELINE CLEANUP ---------------- */
    post {
        always {
            echo "Pipeline Completed"
            cleanWs()
        }
    }
}

