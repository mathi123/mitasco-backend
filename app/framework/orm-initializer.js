const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');

class OrmInitializer{
    initialize(configuration){
        this.configuration = configuration;

        this.startSequelize();
    }

    startSequelize(){
        const database = this.configuration.database;
        const username = this.configuration.username;
        const password = this.configuration.password;
        const config = this.configuration;

        this.sequelize = new Sequelize(database, username, password, config);
    }

    loadModule(moduleName) {
        this.initializeModuleModels(moduleName);
        this.createModels(moduleName);
        this.createModelAssociations(moduleName);
        this.updateModule(moduleName);
    }

    createModels(moduleName){
        const modulePath = path.join(__dirname, '../modules', moduleName);
        const modelsDirPath = path.join(modulePath, 'models');

        fs.readdirSync(modelsDirPath)
            .filter((file) => this.fileFilter(modelsDirPath, file))
            .forEach((file) => this.importSequelizeModel(moduleName, modelsDirPath, file));
    }

    fileFilter(basename, file) {
        return (file !== 'index.js') && (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    }

    importSequelizeModel(moduleName, basename, file){
        const modelFilePath = path.join(basename, file);
        const model = this.sequelize.import(modelFilePath);

        this.sequelize.models[moduleName][model.name] = model;
    }

    createModelAssociations(moduleName){
        Object.keys(this.sequelize.models[moduleName]).forEach((modelName, model) => {
            if (model.associate) {
                model.associate(this.sequelize.models);
            }
        });
    }

    updateModule(moduleName){
        const modelsPath = path.join(__dirname, '../modules', moduleName, 'models');
        const jsModule =  require(modelsPath);

        Object.keys(this.sequelize.models[moduleName]).forEach((modelName, model) => {
            jsModule[modelName] = model;
        });
    }

    initializeModuleModels(moduleName) {
        if(this.sequelize.models === undefined){
            this.sequelize.models = {};
        }
        if(this.sequelize.models[moduleName] === undefined){
            this.sequelize.models[moduleName] = {};
        }
    }
}

module.exports = OrmInitializer;
