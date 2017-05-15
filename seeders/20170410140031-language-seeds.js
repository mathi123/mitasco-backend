
const fs = require('fs');

module.exports = {
    up (queryInterface, Sequelize) {
        const date = new Date('2017-01-01');
        const languages = JSON.parse(fs.readFileSync('./seeders/data/languages.json'));

        languages.forEach(language => {
            language.createdAt = date;
            language.updatedAt = date;
        });

        return queryInterface.bulkInsert('Language', languages, {individualHooks: true});
    },

    down (queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Language');
    },
};
