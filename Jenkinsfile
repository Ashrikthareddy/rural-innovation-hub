pipeline {
    agent any

    environment {
        GIT_REPO = 'https://github.com/Ashrikthareddy/rural-innovation-hub.git'
        GIT_BRANCH = 'main'

        APP_NAME = 'rural-innovation-hub'
        APP_PORT = '3000'

        DOCKER_IMAGE = 'rural-innovation-hub:latest'
        DOCKER_CONTAINER = 'rural-innovation-hub-container'
    }

    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
        timestamps()
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: "${GIT_BRANCH}", url: "${GIT_REPO}"
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Build Application') {
            steps {
                bat 'npm run build'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat '''
                docker build -t %DOCKER_IMAGE% .
                '''
            }
        }

        stage('Stop Old Container') {
            steps {
                bat '''
                docker stop %DOCKER_CONTAINER% >nul 2>&1
                docker rm %DOCKER_CONTAINER% >nul 2>&1
                exit /b 0
                '''
            }
        }

        stage('Run Container') {
            steps {
                bat '''
                docker run -d ^
                --name %DOCKER_CONTAINER% ^
                -p %APP_PORT%:3000 ^
                --restart unless-stopped ^
                -e NODE_ENV=production ^
                %DOCKER_IMAGE%
                '''
            }
        }

        stage('Verify Container') {
            steps {
                bat '''
                docker ps
                '''
            }
        }
    }

    post {
        success {
            echo 'SUCCESS: Application deployed successfully.'
        }

        failure {
            echo 'FAILED: Check Jenkins console output.'
        }

        always {
            echo 'Pipeline execution completed.'
        }
    }
}