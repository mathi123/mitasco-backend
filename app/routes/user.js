"use strict";

const uuid = require('uuid/v4');
const models = require('../../models');
const wrapPromise = require('../helpers').wrapPromise;
const HttpStatus = require('http-status-codes');

let routePrefix = "";

function buildRoutes(app, prefix) {
    routePrefix = prefix;

    app.get(`/${prefix}/user`, wrapPromise(getAllUsers));

    app.get(`/${prefix}/user/:id`, wrapPromise(getUserById));

    app.delete(`/${prefix}/user/:id`, wrapPromise(deleteUser));

    app.post(`/${prefix}/user`, wrapPromise(createUser));

    app.put(`/${prefix}/user/:id`, wrapPromise(updateUser));
}

async function getAllUsers(req, res) {
    console.info("GET user");
    let users = await models.User.all();

    res.json(users.map(userExporter));
}

async function getUserById(req, res) {
    console.info(`GET user/${ req.params.id }`);
    let id = req.params.id;

    let user = await models.User.findOne({ id: id});

    if(user === null){
        console.log("user is null");
        res.sendStatus(HttpStatus.NOT_FOUND);
    }else{
        console.log("user is not null");
        res.json(userExporter(user));
    }
}

async function updateUser(req, res) {
    console.info("PUT user");
    let id = req.params.id;
    let userData = req.body;
    let user = await models.User.findOne({id:id});

    if(user === null){
        res.sendStatus(HttpStatus.NOT_FOUND);
    }else{
        // update user
        let values = {
            fullName : userData.fullName,
            email: userData.email
        };

        await models.User.update(values, {where: {id: id}, fields: ["fullName","email"]});

        res.location(`/${routePrefix}/user/${ id }`);
        res.sendStatus(HttpStatus.NO_CONTENT);
    }
}

async function createUser(req, res) {
    console.info("POST user");
    let userData = req.body;

    let user = {
        id: uuid(),
        fullName: userData.fullName,
        email: userData.email
    };

    await models.User.create(user);

    res.location(`/${routePrefix}/user/${ user.id }`);
    res.sendStatus(HttpStatus.CREATED);
}

async function deleteUser(req, res) {
    console.info(`DELETE user/${ req.params.id }`);
    let id = req.params.id;

    await models.User.destroy({id:id});

    res.sendStatus(HttpStatus.NO_CONTENT);
}

function userExporter(user) {
    user._links = {
        self: `/${routePrefix}/user/${ user.id }`
    };

    return user;
}

exports.buildRoutes = buildRoutes;