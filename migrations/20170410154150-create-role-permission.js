'use strict';
module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('RolePermission', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID
            },
            roleId: {
                allowNull: false,
                type: Sequelize.UUID,
                references: {
                    model: 'Role',
                    key: 'id'
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            },
            permissionId: {
                allowNull: false,
                type: Sequelize.UUID,
                references: {
                    model: 'Permission',
                    key: 'id'
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('RolePermission');
    }
};