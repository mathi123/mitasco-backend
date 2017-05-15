const wrapPromise = require('../helpers').wrapPromise;
const models = require('../../models');

function buildRoutes(app, prefix) {
    app.get(`/${prefix}/context/role`, wrapPromise(getRoles));
    app.get(`/${prefix}/context/permission`, wrapPromise(getPermissions));
    app.get(`/${prefix}/context/user`, wrapPromise(getUserInfo));
}

async function getRoles(req, res) {
    const userId = req.userId;
    const options = {
        include: [{
            model: models.UserRole,
            where: {userId},
        }],
    };

    const roles = await models.Role.findAll(options);

    res.json(roles.map((role) => {
        return {
            id: role.id,
            code: role.code,
            description: role.description,
        };
    }));
}

async function getPermissions(req, res) {
    const userId = req.userId;

    const roleIds = await models.Role.findAll({
        include: [{
            model: models.UserRole,
            where: {userId},
        }],
        attributes: ['id'],
    });

    const options = {
        include: [{
            model: models.RolePermission,
            where: {
                roleId: {
                    $in: roleIds.map(id => id.id),
                }
            },
        }],
    };

    const permissions = await models.Permission.findAll(options);

    res.json(permissions.map((permission) => {
        return {
            id: permission.id,
            code: permission.code,
            description: permission.description,
        };
    }));

}

async function getUserInfo(req, res) {
    const userId = req.userId;

}

exports.buildRoutes = buildRoutes;
