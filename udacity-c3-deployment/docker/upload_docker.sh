#!/bin/bash
set -e -x
sudo docker login --username myluc --password "$dockerhub"

sudo docker system prune -f

cd udacity-c3-deployment/docker/
pwd

dockerpath=myluc/udacity-restapi-feed:V2
sudo docker build -t $dockerpath ../../udacity-c3-restapi-feed
sudo docker push $dockerpath


dockerpath=myluc/udacity-restapi-user:V2
sudo docker build -t $dockerpath ../../udacity-c3-restapi-user
sudo docker push $dockerpath


dockerpath=myluc/udacity-frontend:V7
sudo docker build -t $dockerpath ../../udacity-c3-frontend
sudo docker push $dockerpath


dockerpath=myluc/reverseproxy:V2
sudo docker build -t $dockerpath .
sudo docker push $dockerpath
