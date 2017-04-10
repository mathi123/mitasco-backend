'use strict';

const fs = require('fs');

module.exports = {
    up: function (queryInterface, Sequelize) {
        let date = new Date('2017-01-01');
        let rolePermissions = JSON.parse(fs.readFileSync('./seeders/data/role-permissions.json'));

        rolePermissions.forEach(rolePermission => {
            rolePermission.createdAt = date;
            rolePermission.updatedAt = date;
        });

        return queryInterface.bulkInsert('RolePermission', rolePermissions, {individualHooks: true});
    },

    down: function (queryInterface, Sequelize) {
    }
};
