const uuid = require('uuid/v4');

module.exports = (sequelize, DataTypes) => {
    const RoleTranslation = sequelize.define('RoleTranslation', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
        },
        roleId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        languageId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING(512),
            allowNull: false,
        },
    }, {
        tableName: 'RoleTranslation',
        classMethods: {
            associate (models) {
                const Role = models['Role'];
                Role.hasMany(RoleTranslation, { foreignKey: 'roleId' });

                RoleTranslation.belongsTo(Role,
                    {
                        foreignKey: {
                            name: 'roleId',
                            allowNull: false,
                            onDelete: 'CASCADE',
                        },
                    });
            },
        },
    });

    RoleTranslation.addHook('beforeCreate', async roleTranslation => {
        if (roleTranslation.id === null) {
            roleTranslation.id = uuid();
        }
    });

    return RoleTranslation;
};
