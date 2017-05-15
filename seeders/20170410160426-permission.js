
const fs = require('fs');

module.exports = {
    up (queryInterface, Sequelize) {
        const date = new Date('2017-01-01');
        const permissions = JSON.parse(fs.readFileSync('./seeders/data/permissions.json'));

        permissions.forEach(permission => {
            permission.createdAt = date;
            permission.updatedAt = date;
        });

        return queryInterface.bulkInsert('Permission', permissions, {individualHooks: true});
    },

    down (queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Permission');
    },
};
