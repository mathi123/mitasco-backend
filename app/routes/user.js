const uuid = require('uuid/v4');
const models = require('../../models');
const wrapPromise = require('../helpers').wrapPromise;
const HttpStatus = require('http-status-codes');
const bcrypt = require('bcrypt');

let routePrefix = '';

function buildRoutes(app, prefix) {
    routePrefix = prefix;

    app.get(`/${prefix}/user`, wrapPromise(getAllUsers));

    app.get(`/${prefix}/user/:id`, wrapPromise(getUserById));

    app.delete(`/${prefix}/user/:id`, wrapPromise(deleteUser));

    app.post(`/${prefix}/user`, wrapPromise(createUser));

    app.put(`/${prefix}/user/:id`, wrapPromise(updateUser));
}

async function getAllUsers(req, res) {
    const users = await models.User.all();

    res.json(users.map(userExporter));
}

async function getUserById(req, res) {
    const id = req.params.id;

    const user = await models.User.findOne({id});

    if(user === null){
        res.sendStatus(HttpStatus.NOT_FOUND);
    }else{
        res.json(userExporter(user));
    }
}

async function updateUser(req, res) {
    const id = req.params.id;
    const userData = req.body;
    const user = await models.User.findOne({id});

    if(user === null){
        res.sendStatus(HttpStatus.NOT_FOUND);
    }else{
        // update user
        const values = {
            fullName : userData.fullName,
            email: userData.email,
        };

        await models.User.update(values, {where: {id}, fields: ['fullName', 'email']});

        res.location(`/${routePrefix}/user/${ id }`);
        res.sendStatus(HttpStatus.NO_CONTENT);
    }
}

async function createUser(req, res) {
    const userData = req.body;

    const user = {
        id: uuid(),
        fullName: userData.fullName,
        email: userData.email,
        password: await bcrypt.hash(userData.password, 10),
    };

    await models.User.create(user);

    res.location(`/${routePrefix}/user/${ user.id }`);
    res.sendStatus(HttpStatus.CREATED);
}

async function deleteUser(req, res) {
    const id = req.params.id;

    await models.User.destroy({id});

    res.sendStatus(HttpStatus.NO_CONTENT);
}

function userExporter(user) {
    user._links = {
        self: `/${routePrefix}/user/${ user.id }`,
    };

    return user;
}

exports.buildRoutes = buildRoutes;
