"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const languageRoutes = require('./routes/language');
const HttpStatus = require('http-status-codes');

function createServer(){
    let app = express();
    app.use(bodyParser.json());

    app.get('/', (req, res) => {
        res.send("hello world");
    });

    let prefix = 'api';
    userRoutes.buildRoutes(app, prefix);
    languageRoutes.buildRoutes(app, prefix);

    app.use(async function(err, req, res, next) {
        console.log(err);

        res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
    });

    app.listen(3000, () => {
        console.log("listening on port 3000")
    });

    return app;
}

exports.create = createServer;

