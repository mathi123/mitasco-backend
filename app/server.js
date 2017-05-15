

const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const languageRoutes = require('./routes/language');
const authenticationRoutes = require('./routes/authentication');
const contextRoutes = require('./routes/context');

const HttpStatus = require('http-status-codes');
const cors = require('cors');

function start(port) {
    if (port === null || port === undefined) {
        port = 3000;
    }

    const app = express();
    const corsOptions = {
        allowedHeaders: ['Content-Type', 'Authorization'],
        exposedHeaders: ['Content-Type', 'Authorization'],
    };

    app.use(cors(corsOptions));
    app.use(bodyParser.json());

    app.get('/', (req, res) => {
        res.send('hello world');
    });

    const prefix = 'api';

    app.use(async (req, res, next) => {
        if (req.url !== `/${prefix}/token`) {
            const tokenHeader = req.get('authorization');
            if (tokenHeader === null || tokenHeader === undefined) {
                res.sendStatus(HttpStatus.UNAUTHORIZED);
            } else {
                const token = tokenHeader.substr(tokenHeader.indexOf(' ') + 1);

                const valid = await authenticationRoutes.verifyJwt(token);

                if (valid) {
                    req.userId = authenticationRoutes.getUserIdFromToken(token);

                    next();
                } else {
                    res.sendStatus(HttpStatus.UNAUTHORIZED);
                }
            }
        } else {
            next();
        }
    });

    userRoutes.buildRoutes(app, prefix);
    languageRoutes.buildRoutes(app, prefix);
    authenticationRoutes.buildRoutes(app, prefix);
    contextRoutes.buildRoutes(app, prefix);

    app.use(async function(err, req, res, next) {
        console.log(err);

        res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
    });

    app.listen(port, () => {
        console.log('listening on port ' + port);
    });

    return app;
}

exports.start = start;

