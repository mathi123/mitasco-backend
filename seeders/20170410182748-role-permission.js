

const fs = require('fs');

module.exports = {
    up (queryInterface, Sequelize) {
        const date = new Date('2017-01-01');
        const rolePermissions = JSON.parse(fs.readFileSync('./seeders/data/role-permissions.json'));

        rolePermissions.forEach(rolePermission => {
            rolePermission.createdAt = date;
            rolePermission.updatedAt = date;
        });

        return queryInterface.bulkInsert('RolePermission', rolePermissions, {individualHooks: true});
    },

    down (queryInterface, Sequelize) {
    },
};
