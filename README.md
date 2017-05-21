[![CircleCI](https://circleci.com/gh/mathi123/mitasco-backend.svg?style=shield&circle-token=a94a1da956055129c99ee2c0989b35cf035f6fc5)](https://circleci.com/gh/mathi123/mitasco-backend)
[![Coverage Status](https://coveralls.io/repos/github/mathi123/mitasco-backend/badge.svg?branch=master&t=frUYdw)](https://coveralls.io/github/mathi123/mitasco-backend?branch=master)
[![Docker Build Status](https://img.shields.io/docker/build/jrottenberg/ffmpeg.svg)](https://cloud.docker.com/app/colpaert/repository/docker/colpaert/mitasco-backend)

# Mitasco
Mitasco Server Application

## Prerequisites

- Postgresql database: https://postgresapp.com/
- Node: v7.7.3 or above
- Npm: v4.1.2 or above

## Quickstart

Download the code

    git clone https://github.com/mathi123/mitasco-backend.git


Install
    
    cd mitasco-backend
    npm i
    npm run init-database
    npm run migrate-database

Test

    npm test

Run

    npm start
  
## Other scripts

Develop with live reload on file changes

    npm run watch

TDD: develop with re-execution of tests on file changes

    npm run watch-test