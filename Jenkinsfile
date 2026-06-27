```groovy
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
                git branch: "${env.GIT_BRANCH}",
                    url: "${env.GIT_REPO}"
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
                bat 'docker build -t %DOCKER_IMAGE% .'
            }
        }

        stage('Deploy Container') {
            steps {
                script {

                    // Stop old container if it exists
                    bat '''
                    docker stop %DOCKER_CONTAINER% 2>nul
                    docker rm %DOCKER_CONTAINER% 2>nul
                    '''

                    // Start new container
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
        }
    }

    post {
        success {
            echo "Pipeline completed successfully."
        }

        failure {
            echo "Pipeline failed."
        }

        always {
            echo "Finished."
        }
    }
}
```
