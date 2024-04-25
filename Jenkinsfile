pipeline {
    agent any
    
    environment {
        NODEJS_HOME = tool name: 'node'
        PATH = "${env.NODEJS_HOME}/bin:${env.PATH}"
        DOCKER_REGISTRY = 'docker.io' // Cambiar si se utiliza un registro diferente
        DOCKER_IMAGE_NAME = 'my-rest-api'
        DOCKER_IMAGE_TAG = '1.0'
        DOCKERHUB_USERNAME = credentials('docker_cred_username')
        DOCKERHUB_PASSWORD = credentials('docker_cred_password')
    }
    
    stages {
        stage('Copiando repositorio') {
            steps {
                git branch: 'main', credentialsId: 'ghp_c9LzQhSRiB7XP3hLxCL', url: 'https://github.com/karinadl/CI-CD-API-'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                bat 'npm install cors@^2.8.5 express@^4.19.2 mysql@^2.18.1 mysql2@^3.9.3 pg@^8.11.5'
            }
        }
        
        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG}")
                }
            }
        }
        
        stage('Push Docker Image') {
            steps {
                script {
                    docker.withRegistry('https://${DOCKER_REGISTRY}', 'docker-registry-credentials') {
                        docker.image("${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG}").push()
                    }
                }
            }
        }
        
        stage('Build') {
            steps {
                bat 'npm run dev'
            }
        }
    }
}
