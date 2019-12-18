#!/bin/bash

echo "Assign the minikube docker as env."
eval $(minikube docker-env)

echo "Create the docker images."
docker-compose -f ../docker-compose.yaml build

echo "Delete services, deployments & namespace of 'ecom'."
kubectl delete service -n ecom --all
kubectl delete deploy -n ecom --all
# kubectl delete namespace ecom

# echo "Waiting for 30 sec's..."
# sleep 30

echo "Create namespace 'ecom'."
kubectl create namespace ecom

# echo "Waiting for 1 minute..."
# sleep 60

echo "Deploy containers in ecom namespace."
# for i in *-deploy.yaml; do kubectl apply -f $i; done
for i in *.yaml; do kubectl apply -f $i; done

# echo "Deploy Mongo DB in ecom namespace."
# kubectl apply -f db.yaml

# echo "Deploy Solr in ecom namespace."
# kubectl apply -f solr.yaml

# echo "Deploy Node in ecom namespace."
# kubectl apply -f api-app.yaml

# echo "Deploy React & Redux in ecom namespace."
# kubectl apply -f ui-app.yaml

# echo "Deploy Nginx server in ecom namespace."
# kubectl apply -f nginx-lb.yaml

# echo "Deploy python dataloader in ecom namespace."
# kubectl apply -f dataloader.yaml

echo "Waiting for 30 sec's..."
sleep 30

kubectl get pods -n ecom -o wide
kubectl get service -n ecom -o wide
kubectl get ep -n ecom -o wide

echo "Minikube IP address."
minikube ip
