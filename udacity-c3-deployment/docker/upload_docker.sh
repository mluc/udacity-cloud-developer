#!/bin/bash
set -e -x
dockerhub='1234Qwer'
sudo docker login --username myluc --password "$dockerhub"

sudo docker system prune -f


dockerpath=myluc/udacity-restapi-feed:V3
sudo docker build -t $dockerpath ../../udacity-c3-restapi-feed
sudo docker push $dockerpath


dockerpath=myluc/udacity-restapi-user:V3
sudo docker build -t $dockerpath ../../udacity-c3-restapi-user
sudo docker push $dockerpath


dockerpath=myluc/udacity-frontend:V4
sudo docker build -t $dockerpath ../../udacity-c3-frontend
sudo docker push $dockerpath


dockerpath=myluc/reverseproxy:V3
sudo docker build -t $dockerpath .
sudo docker push $dockerpath
