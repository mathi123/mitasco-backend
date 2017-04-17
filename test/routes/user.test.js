"use strict";

const request = require("supertest");
const should = require("should");
const server = require("../../app/server");
const uuid = require('uuid/v4');

let app = server.create();

describe('GET /user', () => {
    it('should have a valid status code', (done) => {
        request(app)
            .get('/api/user')
            .set('Accept', 'application/json')
            .expect(200, done);
    });
    it('should return an array of users', (done) => {
        request(app)
            .get('/api/user')
            .set('Accept', 'application/json')
            .expect(200, (err, res) => {
                if (err) return done(err);

                res.body.should.be.an.instanceOf(Array);

                done();
            });
    });
});
describe('POST /user', () => {
    it('should have a valid status code', (done) => {
        let testUser = {
            fullName: "test user",
            email: `test@${uuid()}.com`
        };

        /*request(app)
         .post()
         .set('Accept', 'application/json')
         .expect(200, done);*/
    });
});