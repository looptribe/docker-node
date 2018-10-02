FROM node:8

MAINTAINER Andrea Ghidini <andrea.ghidini@looptribe.com>

RUN apt-get update && apt-get install -y \
    gettext-base \
    rsync

RUN mkdir /data && chown node:node /data

VOLUME /data
WORKDIR /data
