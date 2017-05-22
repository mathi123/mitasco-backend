const OrmInitializer = require('./orm-initializer');
const ConfigurationLoader = require('./configuration-loader');
const Server = require('./server');
const path = require('path');

class ModuleBootstrapper{

    constructor(){
        this.ormInitializer = new OrmInitializer();
    }

    run(){
        this.loadConfigurationFile();
        this.initializeOrm();
        this.loadModules();
        this.createServer();
    }

    loadConfigurationFile(){
        const configurationLoader = new ConfigurationLoader();
        const configFilePath = path.join(__dirname, '../configuration.json');

        this.configuration = configurationLoader.load(configFilePath);
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
        const server = new Server(this.configuration);
        server.start();
    }
}

module.exports = ModuleBootstrapper;
