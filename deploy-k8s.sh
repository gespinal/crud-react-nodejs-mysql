#!/bin/bash

# Update env vars
sed -i "s/WEB_HOST=.*/WEB_HOST=https:\/\/crud-web.example.com/g" ./api/.env
sed -i "s/REACT_APP_API_URL=.*/REACT_APP_API_URL=https:\/\/crud-api.example.com/g" ./web/.env

# Build api
cd ./api
docker build -t crud/api .
docker tag crud/api localhost:5001/crud/api:latest
docker push localhost:5001/crud/api:latest
cd ../

# Build web
cd ./web
docker build -t crud/web .
docker tag crud/web localhost:5001/crud/web:latest
docker push localhost:5001/crud/web:latest
cd ../

# Update yml files
cd ./k8s
for i in $(ls *.yml); do
  kubectl apply -f $i
done
cd ../

# Restart deployments
kubectl rollout restart deploy crud-api
kubectl rollout restart deploy crud-web

# Restart .env to localhost
sed -i "s/WEB_HOST=.*/WEB_HOST=http:\/\/localhost:3000/g" ./api/.env
sed -i "s/REACT_APP_API_URL=.*/REACT_APP_API_URL=http:\/\/localhost:3001/g" ./web/.env
