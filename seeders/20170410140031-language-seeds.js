'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.bulkInsert('Languages', [{
            id: '24f3756b-f9ae-4ee2-9709-6e6439e2d3b1',
            code: 'nl',
            description: 'Dutch',
            createdAt: "2017-04-10T14:14:56.748Z",
            updatedAt: "2017-04-10T14:14:56.748Z"
        }], {individualHooks: true});

    },

    down: function (queryInterface, Sequelize) {
    }
};
