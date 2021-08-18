FROM node:16

LABEL maintainer="andrea.ghidini@looptribe.com"

RUN apt-get update && apt-get install -y \
    gettext-base \
    rsync

RUN mkdir /data && chown node:node /data

VOLUME /data
WORKDIR /data
