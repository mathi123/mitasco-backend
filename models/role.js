'use strict';
const uuid = require('uuid/v4');

module.exports = function (sequelize, DataTypes) {
    let Role = sequelize.define('Role', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false
        },
        code: {
            allowNull: false,
            type: DataTypes.STRING
        },
        description: {
            allowNull: false,
            type: DataTypes.STRING
        }
    }, {
        classMethods: {
            associate: function (models) {
                // associations can be defined here
            }
        }
    });

    Role.addHook('beforeCreate', async role => {
        if (role.id === null) {
            role.id = uuid();
        }
    });

    return Role;
};