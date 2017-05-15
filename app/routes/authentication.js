const models = require('../../models');
const wrapPromise = require('../helpers').wrapPromise;
const secretKey = 'KJ2kjJK32LKJA\'/.SD[]';
const HttpStatus = require('http-status-codes');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function buildRoutes(app, prefix) {
    app.post(`/${prefix}/token`, wrapPromise(authenticate));
}

async function authenticate(req, res) {
    const credentials = req.body;

    if (credentials === null || credentials === undefined ||
        credentials.password === null || credentials.password === undefined) {
        throw new Error('Invalid credentials');
    }

    const user = await models.User.findOne({where: {email: credentials.email}});

    if (user === null) {
        res.sendStatus(HttpStatus.UNAUTHORIZED);
    } else {
        const isValid = await bcrypt.compare(credentials.password, user.password);

        if (!isValid) {
            res.sendStatus(HttpStatus.UNAUTHORIZED);
        } else {
            const payload = {
                sub: user.id,
            };

            const token = await jwt.sign(payload, secretKey);

            res.header('Authorization', `Bearer ${token}`);
            res.sendStatus(HttpStatus.NO_CONTENT);
        }
    }
}

function verifyToken(token) {
    return jwt.verify(token, secretKey);
}

function getUserIdFromToken(token) {
    return jwt.decode(token, secretKey).sub;
}

exports.buildRoutes = buildRoutes;
exports.verifyJwt = verifyToken;
exports.getUserIdFromToken = getUserIdFromToken;
