const request = require('supertest');
const should = require('should');
const server = require('../../app/server');
const uuid = require('uuid/v4');
const HttpStatusCode = require('http-status-codes');

const app = server.create();

describe('POST /token', () => {
    it('should return a token on valid login', (done) => {
        const credentials = {
            email: 'test@test.com',
            password: 'test',
        };

        request(app)
            .post('/api/token')
            .set('Accept', 'application/json')
            .send(credentials)
            .expect(HttpStatusCode.NO_CONTENT, (err, res) => {
                if (err) return done(err);

                res.header.authorization.should.not.be.undefined();

                done();
            });
    });

    it('should return authentication error on invalid credentials', (done) => {
        const credentials = {
            email: 'test@test.com',
            password: 'test1',
        };

        request(app)
            .post('/api/token')
            .set('Accept', 'application/json')
            .send(credentials)
            .expect(HttpStatusCode.UNAUTHORIZED, done);
    });

    it('should return authentication error on unexisting user', (done) => {
        const credentials = {
            email: 'test@test.com2',
            password: 'test1',
        };

        request(app)
            .post('/api/token')
            .set('Accept', 'application/json')
            .send(credentials)
            .expect(HttpStatusCode.UNAUTHORIZED, done);
    });
});
