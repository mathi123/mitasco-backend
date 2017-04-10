'use strict';

const uuid = require('uuid/v4');
const Role = require('./role');
const Permission = require('./permission');

module.exports = function (sequelize, DataTypes) {
    let RolePermission = sequelize.define('RolePermission', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            unique: true
        },
        roleId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        permissionId: {
            type: DataTypes.UUID,
            allowNull: false
        },
    }, {
        classMethods: {
            associate: function (models) {
                // associations can be defined here
            }
        }
    });

    RolePermission.addHook('beforeCreate', async (rolePermission) => {
        if (rolePermission.id === null) {
            rolePermission.id = uuid();
        }
    });

    Role.hasMany(RolePermission, {foreignKey: 'roleId'});

    RolePermission.belongsTo(Role,
        {
            foreignKey: {
                name: "roleId",
                allowNull: false,
                onDelete: "CASCADE"
            }
        });

    Permission.hasMany(RolePermission, {foreignKey: 'permissionId'});

    RolePermission.belongsTo(Permission,
        {
            foreignKey: {
                name: "permissionId",
                allowNull: false,
                onDelete: "CASCADE"
            }
        });

    return RolePermission;
};