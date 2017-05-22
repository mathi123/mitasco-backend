const expect = require('chai').expect;
const sinon = require('sinon');
const ConfigurationLoader = require('../configuration-loader');
const Bootstrapper = require('../bootstrapper');
const OrmInitializer = require('../orm-initializer');
const Server = require('../server');
const fs = require('fs');

describe('Bootstrapper', () => {
    let bootstrapper, configurationLoadStub;
    let stubs = [];
    const ormConfig = {
        test: 'test',
    };

    beforeEach('setup', () => {
        // Arrange
        bootstrapper = new Bootstrapper();

        configurationLoadStub = sinon.stub(ConfigurationLoader.prototype, 'load');
        configurationLoadStub.returns({ configKey: 'test', orm: ormConfig, modules: [ 'core' ] });
    });

    it('loads the configuration file', () => {
        // Act
        try{
            bootstrapper.run();
        }catch(err){}

        // Assert
        expect(configurationLoadStub.calledOnce).to.be.true;

        const configFilePath = configurationLoadStub.firstCall.args[0];
        expect(fs.existsSync(configFilePath)).to.be.true;
    });

    it('initializes the orm with orm part of config file', () => {
        // Arrange
        const ormInitStub = sinon.stub(OrmInitializer.prototype, 'initialize');
        stubs.push(ormInitStub);

        // Act
        try{
            bootstrapper.run();
        }catch(err){

        }

        // Assert
        expect(ormInitStub.calledOnce).to.be.true;
        expect(ormInitStub.firstCall.args[0]).to.equal(ormConfig);
    });

    it('starts a server instance', () => {
        // Arrange
        const serverStartStub = sinon.stub(Server.prototype, 'start');
        stubs.push(serverStartStub);
        stubs.push(sinon.stub(OrmInitializer.prototype, 'initialize'));
        stubs.push(sinon.stub(OrmInitializer.prototype, 'loadModule'));

        // Act
        bootstrapper.run();

        // Assert
        expect(serverStartStub.calledOnce).to.be.true;
    });

    afterEach('clean up', () => {
        configurationLoadStub.restore();
        stubs.forEach((stub) => stub.restore());
    });
});
