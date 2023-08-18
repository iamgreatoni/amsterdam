pipeline {
   agent any

    environment{
        DOCKER_USERNAME = credentials('Dockerhub_Username')
        DOCKER_PASSWORD = credentials('Dockerhub_Password')
    }
    stages {
        stage('Preparation') {
            steps{
                echo "BRANCH: ${env.BRANCH_NAME}"
                sh 'docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD'
            }
        }

        stage('Docker build & push') {
            steps{
                script {
                    if (env.BRANCH_NAME == 'main') {
                        echo 'building main';
                        sh '''
                            #!/bin/bash
                            docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD
                            docker build .
                            docker tag iamgreatoni/amsterdam-app iamgreatoni/amsterdam-app:latest
                            docker push iamgreatoni/amsterdam-app:latest
                            docker tag iamgreatoni/amsterdam-app iamgreatoni/amsterdam-app:$BUILD_NUMBER
                            docker push iamgreatoni/amsterdam-app:$BUILD_NUMBER
                        '''
                    }
                    else if (env.BRANCH_NAME == 'test') {
                            echo 'Building test';
                            sh '''
                                #!/bin/bash
                                docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD
                                docker build .
                                docker tag iamgreatoni/amsterdam-app:test iamgreatoni/amsterdam-app:test
                                docker push iamgreatoni/amsterdam-app:test
                            '''   
                    }
                    else if (env.BRANCH_NAME == 'staging') {
                            echo 'Building staging';
                            sh '''
                                #!/bin/bash
                                docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD
                                docker build .
                                docker tag iamgreatoni/amsterdam-app:staging iamgreatoni/amsterdam-app:staging
                                docker push iamgreatoni/amsterdam-app:staging
                            '''   
                        }
                    else {
                        sh '''
                            #!/bin/bash
                            docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD' 
                        '''
                        echo 'Log in is SUCCESSFUL'
                    }
                }
            }
        }

        stage('Deploy') {
            when {
                expression {
                    return env.BRANCH_NAME == 'main' || env.BRANCH_NAME == 'test' || env.BRANCH_NAME == 'staging'
                }
            }

            steps{
                script {
                    if (env.BRANCH_NAME == 'main') {
                        sh '''
                        #!/bin/bash
                            #get kubectl
                            curl -LO https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl
                            chmod +x ./kubectl
                            ./kubectl apply -f ./manifest/deployment.prod.yaml
                            ./kubectl get cm -A
                        '''
                    }
                    else if (env.BRANCH_NAME == 'test') {
                        sh '''
                        #!/bin/bash
                            #get kubectl
                            curl -LO https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl
                            chmod +x ./kubectl
                            ./kubectl apply -f ./manifest/deployment.test.yaml
                            ./kubectl get cm -A
                        '''
                    }
                    else if (env.BRANCH_NAME == 'staging') {
                        sh '''
                        #!/bin/bash
                            #get kubectl
                            curl -LO https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl
                            chmod +x ./kubectl
                            ./kubectl apply -f ./manifest/deployment.staging.yaml
                            ./kubectl get cm -A
                        '''
                    }
                }
            }
        }

        stage('Delivery') {
            when {
                expression {
                    return env.BRANCH_NAME == 'main' || env.BRANCH_NAME == 'test' || env.BRANCH_NAME == 'staging'
                }
            }
            steps{
                script {
                    if (env.BRANCH_NAME == 'main') {
                        sh '''
                        #!/bin/bash
                        ./kubectl rollout restart deployment amsterdam-app -n production 
                        '''
                    }
                    else if (env.BRANCH_NAME == 'test') {
                        sh '''
                        #!/bin/bash
                         ./kubectl rollout restart deployment amsterdam-app-test -n test
                        '''
                    }
                    else if (env.BRANCH_NAME == 'staging') {
                        sh '''
                        #!/bin/bash
                        ./kubectl rollout restart deployment amsterdam-app-staging -n staging 
                        '''
                    }
                }
            }
        }
    }
}
