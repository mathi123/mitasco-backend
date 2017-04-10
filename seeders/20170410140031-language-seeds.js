'use strict';
const fs = require('fs');

module.exports = {
    up: function (queryInterface, Sequelize) {
        let date = new Date('2017-01-01');
        let languages = JSON.parse(fs.readFileSync('./seeders/data/languages.json'));

        languages.forEach(l => {
            l.createdAt = date;
            l.updatedAt = date;
        });

        return queryInterface.bulkInsert('Languages', languages, {individualHooks: true});

    },

    down: function (queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Languages');
    }
};
