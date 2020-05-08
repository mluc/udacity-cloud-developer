#!/bin/bash
set -e -x

kubectl delete deployment.apps/backend-feed deployment.apps/backend-user deployment.apps/frontend deployment.apps/reverseproxy

kubectl delete service/backend-feed service/backend-user service/frontend service/reverseproxy
