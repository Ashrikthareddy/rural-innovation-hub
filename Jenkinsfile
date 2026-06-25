pipeline {
  agent any

  environment {
    GIT_REPO = 'https://github.com/Ashrikthareddy/rural-innovation-hub.git'
    GIT_BRANCH = 'main'
    APP_NAME = 'rural-innovation-hub'
    APP_PORT = '3000'
    IMAGE_TAG = "build-${BUILD_NUMBER}"
    DOCKER_IMAGE = "${APP_NAME}:${IMAGE_TAG}"
    DOCKER_CONTAINER = "${APP_NAME}-container"
  }

  options {
    buildDiscarder(logRotator(numToKeepStr: '10'))
    timestamps()
  }

  stages {
    stage('Checkout') {
      steps {
        echo "Checking out ${env.GIT_BRANCH} from ${env.GIT_REPO}"
        checkout([
          $class: 'GitSCM',
          branches: [[name: env.GIT_BRANCH]],
          userRemoteConfigs: [[url: env.GIT_REPO]]
        ])
      }
    }

    stage('Install Dependencies') {
      steps {
        echo 'Installing npm dependencies'
        script {
          if (isUnix()) {
            sh 'npm ci'
          } else {
            bat 'npm ci'
          }
        }
      }
    }

    stage('Build Application') {
      steps {
        echo 'Building Next.js application'
        script {
          if (isUnix()) {
            sh 'npm run build'
          } else {
            bat 'npm run build'
          }
        }
      }
    }

    stage('Run Tests') {
      steps {
        script {
          if (fileExists('package.json')) {
            def hasTestScript = false
            def packageJson = readJSON file: 'package.json'
            if (packageJson.scripts?.test) {
              hasTestScript = true
            }

            if (hasTestScript) {
              echo 'Running tests via npm test'
              if (isUnix()) {
                sh 'npm test'
              } else {
                bat 'npm test'
              }
            } else {
              echo 'No test script found in package.json, skipping tests.'
            }
          } else {
            echo 'package.json not found, skipping tests.'
          }
        }
      }
    }

    stage('Build Docker Image') {
      steps {
        echo "Building Docker image ${env.DOCKER_IMAGE}"
        script {
          if (isUnix()) {
            sh "docker build --pull -t ${env.DOCKER_IMAGE} ."
          } else {
            bat "docker build --pull -t ${env.DOCKER_IMAGE} ."
          }
        }
      }
    }

    stage('Deploy Container') {
      steps {
        echo 'Stopping and removing previous container if it exists'
        script {
          if (isUnix()) {
            sh "docker container rm -f ${env.DOCKER_CONTAINER} || true"
          } else {
            try {
              bat "docker container rm -f ${env.DOCKER_CONTAINER}"
            } catch (err) {
              echo "No existing container to remove: ${err}"
            }
          }
        }

        echo 'Removing stale image tag if present'
        script {
          if (isUnix()) {
            sh "docker image rm -f ${env.DOCKER_IMAGE} || true"
          } else {
            try {
              bat "docker image rm -f ${env.DOCKER_IMAGE}"
            } catch (err) {
              echo "No existing image to remove: ${err}"
            }
          }
        }

        echo 'Starting new Docker container'
        script {
          if (isUnix()) {
            sh "docker run -d --name ${env.DOCKER_CONTAINER} -p ${env.APP_PORT}:3000 --restart unless-stopped -e NODE_ENV=production -e PORT=3000 ${env.DOCKER_IMAGE}"
          } else {
            bat "docker run -d --name ${env.DOCKER_CONTAINER} -p ${env.APP_PORT}:3000 --restart unless-stopped -e NODE_ENV=production -e PORT=3000 ${env.DOCKER_IMAGE}"
          }
        }
      }
    }
  }

  post {
    success {
      echo 'Jenkins pipeline completed successfully.'
    }
    failure {
      echo 'Jenkins pipeline failed. Check console logs for details.'
    }
    always {
      echo "Finished pipeline for ${env.GIT_REPO} on branch ${env.GIT_BRANCH}."
    }
  }
}
