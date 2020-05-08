#!/bin/bash
set -e -x

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


#kubectl port-forward service/reverseproxy 8080:8080
#kubectl port-forward service/frontend 8100:8100
