#!/bin/bash

set -e

if [[ $# -eq 0 ]] ; then
    echo 'Missing tag, run with:'
    echo "$0 <tag>"
    exit 1
fi

docker build -t looptribe/docker-node:$1 $1
docker push looptribe/docker-node:$1
