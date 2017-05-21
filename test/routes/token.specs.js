const request = require('supertest');
const AuthenticationController = require('../../app/controllers/authentication-controller');
const expect = require('chai').expect;
const Server = require('../../app/server');
const sinon = require('sinon');

describe('POST /api/token', () => {
    const credentials = {
        email: 'test@test.com',
        password: 'test',
    };
    let app, server, authenticateSpy;

    beforeEach('setup app', () => {
        server = new Server({port:3123});
        server.start();
        app = server.getApp();
    });

    it('calls authentication controller', async () => {
        authenticateSpy = sinon.spy(AuthenticationController.prototype, 'authenticate');

        await request(app)
            .post('/api/token')
            .set('Accept', 'application/json')
            .send(credentials);

        expect(authenticateSpy.calledOnce).to.equal(true);
    });

    it('returns 500 on internal error', async () => {
        let authenticateStub = sinon.stub(AuthenticationController.prototype, 'authenticate');
        authenticateStub.throws();

        AuthenticationController.prototype = authenticateStub;

        await request(app)
            .post('/api/token')
            .set('Accept', 'application/json')
            .send(credentials)
            .expect(500);
    });

    afterEach(()=>{
        server.stop();

        if(authenticateSpy){
            authenticateSpy.restore();
        }
    })
});
