const uuid = require('uuid/v4');
const models = require('../models');
const HttpStatus = require('http-status-codes');

class UnitController{
    constructor(routePrefix){
        this.routePrefix = routePrefix;
    }

    buildRoutes(app){
        app.get(`/${this.routePrefix}/unit`, (req, res, next) => this.getAllUnit(req, res).catch(next));
        app.get(`/${this.routePrefix}/unit/:id`, (req, res, next) => this.getUnitById(req, res).catch(next));
        app.post(`/${this.routePrefix}/unit`, (req, res, next) => this.createUnit(req, res).catch(next));
        app.put(`/${this.routePrefix}/unit/:id`, (req, res, next) => this.updateUnit(req, res).catch(next));
        app.delete(`/${this.routePrefix}/unit/:id`, (req, res, next) => this.deleteUnit(req, res).catch(next));
    }

    async getAllUnit(req, res){
        const unitList = await models.Unit.all();
        const result = unitList.map(this.mapToUnitDto);

        res.json(result);
    }

    async getUnitById(req, res){
        const id = req.params.id;

        const unit = await models.Unit.findOne({ where: { id } });

        if (unit === null) {
            res.sendStatus(HttpStatus.NOT_FOUND);
        } else {
            res.json(this.mapToUnitDto(unit));
        }
    }

    async createUnit(req, res){
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
            // TODO add more fields
        };

        await models.Unit.create(data);

        res.location(`/${this.routePrefix}/unit/${data.id}`);
        res.sendStatus(HttpStatus.CREATED);
    }

    async updateUnit(req, res){
        // TODO add extra validation
        if (req.body.description === null || req.body.description === undefined) {
            throw new Error('description missing');
        }

        if (req.params.id === null || req.params.id === undefined) {
            throw new Error('id missing');
        }

        const id = req.params.id;
        const unit = await models.Unit.findOne({ where: { id } });

        if (unit === null) {
            res.sendStatus(HttpStatus.NOT_FOUND);
        } else {
            const data = {
                description: req.body.description,
            };

            await models.Unit.update(data, {
                where: {
                    id,
                }, fields: ['description'], // Todo check fields to update
            });

            res.location(`/${this.routePrefix}/unit/${id}`);
            res.sendStatus(HttpStatus.NO_CONTENT);
        }
    }

    async deleteUnit(req, res){
        const id = req.params.id;

        const unit = models.Unit.findOne({ where: { id } });

        if (unit !== null) {
            await models.Unit.destroy({ where: { id } });
        }

        res.sendStatus(HttpStatus.NO_CONTENT);
    }

    mapToUnitDto(unit) {
        const result = {};

        result.id = unit.id;
        result.code = unit.code;

        // TODO add more relevant fields

        result._links = {
            self: `/${this.routePrefix}/unit/${ result.id }`,
        };

        return result;
    }
}

module.exports = UnitController;
