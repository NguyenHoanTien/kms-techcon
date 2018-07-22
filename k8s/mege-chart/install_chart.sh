#!/usr/bin/env bash
helm dependency build && helm install ./ --namespace mege --name mege
