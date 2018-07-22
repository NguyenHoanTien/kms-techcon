#!/usr/bin/env bash
helm install --name mege-db --set postgresDatabase=mege,postgresUser=postgres,postgresPassword=postgres stable/postgresql
