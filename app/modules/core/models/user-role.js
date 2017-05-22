
module.exports = function (sequelize, DataTypes) {
    const UserRole = sequelize.define('UserRole', {
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
    }, {
        tableName: 'UserRole',
        classMethods: {
            associate (models) {
                const Role = models['Role'];
                const User = models['User'];
                const UserRole = models['UserRole'];

                Role.hasMany(UserRole, { foreignKey: 'roleId' });

                User.hasMany(UserRole, { foreignKey: 'userId' });

                UserRole.belongsTo(Role,
                    {
                        foreignKey: {
                            name: 'roleId',
                            allowNull: false,
                            onDelete: 'CASCADE',
                        },
                    });

                UserRole.belongsTo(User,
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
    return UserRole;
};
