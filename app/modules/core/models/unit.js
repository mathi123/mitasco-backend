
const uuid = require('uuid/v4');

module.exports = function (sequelize, DataTypes) {
    const Unit = sequelize.define('Unit', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
        },
        code: {
            allowNull: false,
            unique: true,
            type: DataTypes.STRING(8),
        },
        description: {
            allowNull: false,
            type: DataTypes.STRING(32),
        },
    }, {
        tableName: 'Unit',
    });

    Unit.addHook('beforeCreate', async unit => {
        if (unit.id === null) {
            unit.id = uuid();
        }
    });

    return Unit;
};
