"use strict";

const request = require("supertest");
const should = require("should");
const server = require("../../app/server");

let app = server.create();

describe('GET /user', function() {
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