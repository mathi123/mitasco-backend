
module.exports = function (sequelize, DataTypes) {
    const RoleUser = sequelize.define('RoleUser', {
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
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE,
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE,
        },
    }, {
        tableName: 'RoleUser',
        classMethods: {
            associate (models) {
                const Role = models['Role'];
                const User = models['User'];
                const RoleUser = models['RoleUser'];

                Role.hasMany(RoleUser, { foreignKey: 'roleId' });

                User.hasMany(RoleUser, { foreignKey: 'userId' });

                RoleUser.belongsTo(Role,
                    {
                        foreignKey: {
                            name: 'roleId',
                            allowNull: false,
                            onDelete: 'CASCADE',
                        },
                    });

                RoleUser.belongsTo(User,
                    {
                        foreignKey: {
                            name: 'userId',
                            allowNull: false,
                            onDelete: 'CASCADE',
                        },
                    });
            },
        },
    });
    return RoleUser;
};
