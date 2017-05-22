const path = require('path');
const fs = require('fs');

class RouteInitializer{
    constructor(application, routePrefix){
        this.application = application;
        this.routePrefix = routePrefix;
    }

    loadModule(moduleName){
        const modulePath = path.join(__dirname, '../modules', moduleName);
        const controllersDirPath = path.join(modulePath, 'controllers');

        fs.readdirSync(controllersDirPath)
            .filter((file) => this.fileFilter(controllersDirPath, file))
            .forEach((file) => this.buildRoutes(moduleName, controllersDirPath, file));
    }

    fileFilter(basename, file) {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    }

    buildRoutes(moduleName, controllersDirPath, file) {
        const routeBuilderPath = path.join(controllersDirPath, file);
        const RouteBuilder = require(routeBuilderPath);

        const controller = new RouteBuilder(this.routePrefix);
        controller.buildRoutes(this.application);
    }
}

module.exports = RouteInitializer;
