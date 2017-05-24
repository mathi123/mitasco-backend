const OrmInitializer = require('./orm-initializer');
const ConfigurationLoader = require('./configuration-loader');
const Server = require('./server');
const RouteInitializer = require('./route-intializer');
const path = require('path');
const DatabaseMigrator = require('./database-migrator');

class Bootstrapper{

    constructor(){
        this.ormInitializer = new OrmInitializer();
    }

    run(){
        this.loadConfigurationFile();
        this.initializeOrm();
        this.runMigrations();
        this.loadModules();
        this.createServer();
        this.buildRoutes();

        return this.server;
    }

    loadConfigurationFile(){
        const configurationLoader = new ConfigurationLoader();
        const configFilePath = path.join(__dirname, '../configuration.json');

        this.configuration = configurationLoader.load(configFilePath);
    }

    runMigrations(){
        if(this.configuration.runMigrationsOnStartUp){
            this.migrationRunner = new DatabaseMigrator(this.configuration.orm, this.ormInitializer.sequelize);
            this.configuration.modules.forEach(async (module) => await this.migrationRunner.executeModuleMigrations(module));
        }
    }

    initializeOrm(){
        this.ormInitializer.initialize(this.configuration.orm);
    }

    loadModules(){
        const modules = this.configuration.modules;
        modules.forEach((module) => this.loadModule(module));
    }

    loadModule(module) {
        // Load ORM models
        this.ormInitializer.loadModule(module);
    }

    createServer() {
        this.server = new Server(this.configuration);
        this.server.build();
    }

    buildRoutes(){
        const app = this.server.getApp();
        const routPrefix = this.configuration.routePrefix;
        const routeInitializer = new RouteInitializer(app, routPrefix);
        const modules = this.configuration.modules;
        modules.forEach((module) => routeInitializer.loadModule(module));
    }
}

module.exports = Bootstrapper;