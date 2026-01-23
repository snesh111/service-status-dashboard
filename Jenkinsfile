pipeline{
    agent any

    stages{
        stage("check out"){
            steps{
                checkout scm
            }
        }
        stage("install dependence"){
            steps{
                sh 'npm install'
            }
        }
        stage("docker build "){
            steps{
                sh  '''
                docker build -t service-status-dashboard:latest .
                '''
            }
        }
    }

}
