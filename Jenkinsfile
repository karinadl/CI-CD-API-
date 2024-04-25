pipeline {
    agent any
    
    environment {
        NODEJS_HOME = tool name: 'node'
        PATH = "${env.NODEJS_HOME}/bin:${env.PATH}"
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
        
        stage("Build Image") {
            steps {
                script {
                    docker.build('karinadeleon/my-rest-api:latest', '.')
                }
            }
        }
        
        stage ('Docker Push') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker_cred', passwordVariable: 'DOCKERHUB_PASSWORD', usernameVariable: 'DOCKERHUB_USERNAME')]){
                    bat 'docker login -u karinadeleon -p 123ka*2309'
                    bat 'docker tag my-rest-api:1.0 karinadeleon/my-rest-api:latest'
                    bat 'docker push karinadeleon/my-rest-api:latest'
                    bat 'docker logout'
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
