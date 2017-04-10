'use strict';
const uuid = require('uuid/v4');

module.exports = function (sequelize, DataTypes) {
    let Language = sequelize.define('Language', {
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
        },
    }, {
        classMethods: {
            associate: function (models) {
                // associations can be defined here
            }
        }
    });

    Language.addHook('beforeCreate', async language => {
        if (language.id === null) {
            language.id = uuid();
        }
    });

    return Language;
};