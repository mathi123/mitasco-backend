[![CircleCI](https://circleci.com/gh/mathi123/mitasco-backend.svg?style=svg)](https://circleci.com/gh/mathi123/mitasco-backend)

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
    ./setup-postgresql.sh
    ./node_modules/sequelize-cli/bin/sequelize db:migrate

Test

    npm test

Run

    npm start