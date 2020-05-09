#!/bin/bash
set -e -x
sudo docker login --username myluc --password 828ec68f-cd99-4d40-882c-74be569e23c0

sudo docker system prune -f


dockerpath=myluc/udacity-restapi-feed:V3
sudo docker build -t $dockerpath ../../udacity-c3-restapi-feed
sudo docker push $dockerpath


dockerpath=myluc/udacity-restapi-user:V3
sudo docker build -t $dockerpath ../../udacity-c3-restapi-user
sudo docker push $dockerpath


dockerpath=myluc/udacity-frontend:V8
sudo docker build -t $dockerpath ../../udacity-c3-frontend
sudo docker push $dockerpath


dockerpath=myluc/reverseproxy:V3
sudo docker build -t $dockerpath .
sudo docker push $dockerpath
