const request = require('supertest');
const ContextController = require('../../app/controllers/context-controller');
const AuthenticationController = require('../../app/controllers/authentication-controller');
const expect = require('chai').expect;
const Server = require('../../app/server');
const sinon = require('sinon');

describe('GET /api/context', () => {
    let app, server, spy, authStub;

    beforeEach('setup app', () => {
        authStub = sinon.stub(AuthenticationController.prototype, 'checkAuthenticationToken');
        authStub.callsFake((req, res, next) => {
            req.userId = 1;
            next();
        });

        server = new Server({port:3123});
        server.start();
        app = server.getApp();
    });

    describe('/role', () => {
        it('calls context controllers getRoles', async () => {
            spy = sinon.spy(ContextController.prototype, 'getRoles');

            await request(app)
                .get('/api/context/role')
                .send();

            expect(spy.calledOnce).to.equal(true);
        });
    });

    describe('/permission', () => {
        it('calls context controllers getPermissions', async () => {
            spy = sinon.spy(ContextController.prototype, 'getPermissions');

            await request(app)
                .get('/api/context/permission')
                .send();

            expect(spy.calledOnce).to.equal(true);
        });
    });

    afterEach(()=>{
        server.stop();
        authStub.restore();

        if(spy){
            spy.restore();
        }
    })
});
