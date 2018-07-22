#!/usr/bin/env bash
name="vunguyenhung/mege-api" \
&& tag=`git log -1 --pretty=%h` \
&& img=${name}:${tag} \
&& latest=${name}":latest" \
&& docker build -t ${img} . \
&& docker tag ${img} ${latest} \
&& docker push ${name}
