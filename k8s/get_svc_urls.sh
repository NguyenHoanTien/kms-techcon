#!/usr/bin/env bash
minikube service --url mege-frontend --namespace mege
minikube service --url mege-api --namespace mege
minikube service --url mege-monitor --namespace mege
