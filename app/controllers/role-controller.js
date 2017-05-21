const RoleModel = require('../../models').Role;
const HttpStatus = require('http-status-codes');

class RoleController {
    constructor(routePrefix){
        this.routePrefix = routePrefix;
    }

    buildRoutes(app){
        app.get(`/${this.routePrefix}/role/:id`, (req, res, next) => this.getRoleById.catch(next));
    }
    async getRoleById(req, res) {
        const id = req.params.id;

        const role = await RoleModel.findOne({ where: { id } });

        if(role === null){
            return res.sendStatus(HttpStatus.NOT_FOUND);
        }else{
            return res.json(this.mapRole(role));
        }
    }

    mapRole(role){
        return {
            id: role.id,
            code: role.code,
            description: role.description,
            _links: {
                self: `/${this.routePrefix}/role/${ role.id }`,
            },
        };
    }

}

module.exports = RoleController;
