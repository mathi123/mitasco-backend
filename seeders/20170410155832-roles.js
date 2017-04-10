'use strict';
const fs = require('fs');

module.exports = {
    up: function (queryInterface, Sequelize) {
        let date = new Date('2017-01-01');
        let roles = JSON.parse(fs.readFileSync('./seeders/data/roles.json'));

        roles.forEach(role => {
            role.createdAt = date;
            role.updatedAt = date;
        });

        return queryInterface.bulkInsert('Role', roles, {individualHooks: true});
    },

    down: function (queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Role');
    }
};
