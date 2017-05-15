
const uuid = require('uuid/v4');

module.exports = function (sequelize, DataTypes) {
    const Permission = sequelize.define('Permission', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
        },
        code: {
            allowNull: false,
            unique: true,
            type: DataTypes.STRING,
        },
        description: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        isRemovable: {
            allowNull: false,
            type: DataTypes.BOOLEAN,
        },
    }, {
        tableName: 'Permission',
        classMethods: {
            associate (models) {
                // associations can be defined here
            },
        },
    });

    Permission.addHook('beforeCreate', async permission => {
        if (permission.id === null) {
            permission.id = uuid();
        }
    });

    return Permission;
};
