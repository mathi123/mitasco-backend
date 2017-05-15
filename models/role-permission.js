

const uuid = require('uuid/v4');

module.exports = function (sequelize, DataTypes) {
    const RolePermission = sequelize.define('RolePermission', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            unique: true,
        },
        roleId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        permissionId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
    }, {
        tableName: 'RolePermission',
        classMethods: {
            associate (models) {
                const Role = models['Role'];
                const Permission = models['Permission'];
                const RolePermission = models['RolePermission'];

                Role.hasMany(RolePermission, {foreignKey: 'roleId'});

                Permission.hasMany(RolePermission, {foreignKey: 'permissionId'});

                RolePermission.belongsTo(Role,
                    {
                        foreignKey: {
                            name: 'roleId',
                            allowNull: false,
                            onDelete: 'CASCADE',
                        },
                    });

                RolePermission.belongsTo(Permission,
                    {
                        foreignKey: {
                            name: 'permissionId',
                            allowNull: false,
                            onDelete: 'CASCADE',
                        },
                    });
            },
        },
    });

    RolePermission.addHook('beforeCreate', async (rolePermission) => {
        if (rolePermission.id === null) {
            rolePermission.id = uuid();
        }
    });


    return RolePermission;
};
