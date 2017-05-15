

const uuid = require('uuid/v4');
const models = require('../../models');
const HttpStatus = require('http-status-codes');
const wrapPromise = require('../helpers').wrapPromise;
let routePrefix = '';

function buildRoutes(app, prefix) {
    routePrefix = prefix;

    app.get(`/${prefix}/language`, wrapPromise(getAllLanguages));
    app.get(`/${prefix}/language/:id`, wrapPromise(getLanguageById));
    app.put(`/${prefix}/language`, wrapPromise(updateLanguage));
    app.post(`/${prefix}/language`, wrapPromise(createLanguage));
    app.delete(`/${prefix}/language/:id`, wrapPromise(deleteLanguage));
}

async function getAllLanguages(req, res) {
    const languages = await models.Language.all();

    res.json(languages.map(mapLanguage));
}

async function getLanguageById(req, res) {
    const id = req.params.id;

    const language = await models.Language.findOne({where: {id}});

    if (language === null) {
        res.sendStatus(HttpStatus.NOT_FOUND);
    } else {
        res.json(mapLanguage(language));
    }
}

async function createLanguage(req, res) {
    if (req.body.code === null || req.body.code === undefined) {
        throw new Error('code missing');
    }

    if (req.body.description === null || req.body.description === undefined) {
        throw new Error('description missing');
    }

    const data = {
        id: uuid(),
        code: req.body.code,
        description: req.body.description,
    };

    await models.Language.create(data);

    res.location(`/${routePrefix}/language/${data.id}`);
    res.sendStatus(HttpStatus.CREATED);
}

async function updateLanguage(req, res) {
    if (req.body.description === null || req.body.description === undefined) {
        throw new Error('description missing');
    }

    if (req.params.id === null || req.params.id === undefined) {
        throw new Error('id missing');
    }

    const id = req.params.id;

    const language = await models.Language.findOne({where: {id}});

    if (language === null) {
        res.sendStatus(HttpStatus.NOT_FOUND);
    } else {
        const data = {
            description: req.body.description,
        };

        await models.Language.update(data, {
            where: {
                id,
            }, fields: ['description'],
        });

        res.location(`/${routePrefix}/language/${id}`);
        res.sendStatus(HttpStatus.NO_CONTENT);
    }
}


async function deleteLanguage(req, res) {
    const id = req.params.id;

    const language = models.Language.findOne({where: {id}});

    if (language !== null) {
        await models.Language.destroy({where: {id}});
    }

    res.sendStatus(HttpStatus.NO_CONTENT);
}

function mapLanguage(language) {
    const result = {};
    result.id = language.id;
    result.code = language.code;
    result.description = language.description;
    result._links = {
        self: `/${routePrefix}/language/${ result.id }`,
    };

    return result;
}

exports.buildRoutes = buildRoutes;
