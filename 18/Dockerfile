FROM node:18

LABEL maintainer="diego.ferri@looptribe.com"

RUN apt-get update && apt-get install -y \
    gettext-base \
    rsync \
    zip

RUN mkdir /data && chown node:node /data

VOLUME /data
WORKDIR /data
