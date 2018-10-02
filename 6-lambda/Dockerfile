FROM node:6.10.3

MAINTAINER Diego Ferri <diego.ferri@looptribe.com>

RUN apt-get update && apt-get install -y \
    gettext-base \
    rsync

RUN mkdir /data && chown node:node /data

VOLUME /data
WORKDIR /data
