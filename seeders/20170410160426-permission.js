'use strict';
const fs = require('fs');

module.exports = {
    up: function (queryInterface, Sequelize) {
        let date = new Date('2017-01-01');
        let permissions = JSON.parse(fs.readFileSync('./seeders/data/permissions.json'));

        permissions.forEach(permission => {
            permission.createdAt = date;
            permission.updatedAt = date;
        });

        return queryInterface.bulkInsert('Permission', permissions, {individualHooks: true});
    },

    down: function (queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Permission');
    }
};
