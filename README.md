# Udagram Image Filtering Microservice

## Github link:
- https://github.com/mluc/udacity-cloud-developer

## Run locally:
- `cd udacity-c3-deployment/docker`
- `docker-compose -f docker-compose-build.yaml build --parallel` to build images
- `docker-compose up` to run containers

## Kubernetes:
- `eksctl create cluster --name prod2 --zones=us-east-1a,us-east-1b --region us-east-1 --nodegroup-name standard-workers --node-type m5.large --nodes 5 --nodes-min 1 --nodes-max 5 --ssh-access --managed` to create cluster
- `bash udacity-c3-deployment/docker/upload_docker.sh ` to build images and upload to dockerhub
- `bash udacity-c3-deployment/k8s/deploy.sh` to deploy
- Link: http://a5701791095804ba0a139b8b6c83cdc6-643514599.us-east-1.elb.amazonaws.com:8100/

## Travis-ci job log:
- https://api.travis-ci.com/v3/job/330907726/log.txt

## Screenshot:
- screenshot.pdf

