
const fs = require('fs');

module.exports = {
    up (queryInterface, Sequelize) {
        const date = new Date('2017-01-01');
        const roles = JSON.parse(fs.readFileSync('./seeders/data/roles.json'));

        roles.forEach(role => {
            role.createdAt = date;
            role.updatedAt = date;
        });

        return queryInterface.bulkInsert('Role', roles, {individualHooks: true});
    },

    down (queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Role');
    },
};
