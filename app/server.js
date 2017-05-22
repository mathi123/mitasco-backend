const initializeExpressApplication = require('express');
const bodyParser = require('body-parser');
const UserController = require('./controllers/user-controller');
const LanguageController = require('./controllers/language-controller');
const AuthenticationController = require('./controllers/authentication-controller');
const ContextController = require('./controllers/context-controller');

const HttpStatus = require('http-status-codes');
const cors = require('cors');

class Server{
    constructor(configuration){
        this.port = configuration.port || 3000;
        this.routePrefix = configuration.routePrefix || 'api';
        this.debug = configuration.debug || false;
    }

    start(){
        this.build();
        this.run();
    }

    stop(){
        this.server.close();
    }

    run(){
        this.server = this.app.listen(this.port, () => {
            if(this.debug){
                console.info('listening on port ' + this.port);
            }
        });
    }

    build() {
        this.initializeExpress();

        this.initializeMiddleWares();

        this.buildRoutes();
    }

    buildRoutes(){
        // AuthenticationController must be added first!
        new AuthenticationController(this.routePrefix).buildRoutes(this.app);
        new ContextController(this.routePrefix).buildRoutes(this.app);
        //new LanguageController(this.routePrefix).buildRoutes(this.app);
        //new UserController(this.routePrefix).buildRoutes(this.app);

        // Fallback route
        this.app.use((err, req, res, next) => this.exceptionHandler(err, req, res));
    }

    exceptionHandler(err, req, res) {
        if(this.debug){
            console.error(err);
        }
        res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    initializeExpress(){
        this.app = initializeExpressApplication();
    }

    initializeMiddleWares(){
        this.enableCorsMiddleWare();
        this.enableJsonParserMiddleWare();
    }

    enableCorsMiddleWare(){
        const corsOptions = {
            allowedHeaders: ['Content-Type', 'Authorization'],
            exposedHeaders: ['Content-Type', 'Authorization'],
        };
        const corsMiddleWare = cors(corsOptions);
        this.app.use(corsMiddleWare);
    }

    enableJsonParserMiddleWare(){
        const bodyParserMiddleWare = bodyParser.json();
        this.app.use(bodyParserMiddleWare);
    }

    getApp(){
        return this.app;
    }
}

module.exports = Server;
