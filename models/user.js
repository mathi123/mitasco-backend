'use strict';
const uuid = require('uuid/v4');

module.exports = function (sequelize, DataTypes) {
    let User = sequelize.define('User', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false
        },
        fullName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        }
    }, {
        classMethods: {
            associate: function (models) {
                // associations can be defined here
            }
        }
    });

    User.addHook('beforeCreate', async user => {
        if (user.id === null) {
            user.id = uuid();
        }
    });

    return User;
};