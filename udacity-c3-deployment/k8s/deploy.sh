#!/bin/bash
set -e -x

eksctl version

mkdir ~/.aws
touch ~/.aws/credentials
echo "[default]" >> ~/.aws/credentials
echo "aws_access_key_id = $aws_access_key_id" >> ~/.aws/credentials
echo "aws_secret_access_key = $aws_secret_access_key" >> ~/.aws/credentials

mkdir ~/.kube
touch ~/.kube/config
cp udacity-c3-deployment/k8s/kube_config ~/.kube/config
cat ~/.kube/config

eksctl get cluster -n prod2 -r us-east-1 -p default

kubectl apply -f backend-feed-deployment.yaml
kubectl apply -f backend-feed-service.yaml

sleep 10

kubectl apply -f backend-user-deployment.yaml
kubectl apply -f backend-user-service.yaml

sleep 10

kubectl apply -f frontend-deployment.yaml
kubectl apply -f frontend-service.yaml

sleep 10

kubectl apply -f reverseproxy-deployment.yaml
kubectl apply -f reverseproxy-service.yaml

sleep 10

kubectl apply -f env-configmap.yaml
kubectl apply -f aws-secret.yaml
kubectl apply -f env-secret.yaml

sleep 10
kubectl get all



