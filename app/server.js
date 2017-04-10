"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const internalErrorCode = 500;
function createServer(){
    let app = express();
    app.use(bodyParser.json());



    app.get('/', (req, res) => {
        res.send("hello world");
    });

    userRoutes.buildRoutes(app, 'api');

    app.use(async function(err, req, res, next) {
        console.error("error caught higher up the stack");
        console.log(err);

        res.sendStatus(internalErrorCode);
    });

    app.listen(3000, () => {
        console.log("listening on port 3000")
    });

    return app;
}

exports.create = createServer;

