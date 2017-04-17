"use strict";

const request = require("supertest");
const should = require("should");
const server = require("../../app/server");
const uuid = require('uuid/v4');
const HttpStatusCode = require('http-status-codes');
const models = require('../../models');

let app = server.create();

describe('GET /language', () => {
    it('should return an array of languages', (done) => {
        request(app)
            .get('/api/language')
            .set('Accept', 'application/json')
            .expect(HttpStatusCode.OK, (err, res) => {
                if (err) return done(err);

                res.body.should.be.an.instanceOf(Array);

                done();
            });
    });
});

describe('POST /language', () => {
    let language = {
        link: "",
        code: "unit",
        description: "unit test language"
    };

    it('should return a location header', (done) => {
        request(app)
            .post('/api/language')
            .set('Accept', 'application/json')
            .send(language)
            .expect(HttpStatusCode.CREATED, (err, res) => {
                if (err) return done(err);

                language.link = res.header.location;
                language.id = language.link.slice(language.link.lastIndexOf('/') + 1);

                language.link.should.not.be.undefined();
                language.id.should.not.be.undefined();

                done();
            });
    });

    it('returns a link that allows to delete resource', (done) => {
        request(app)
            .delete(language.link)
            .expect(HttpStatusCode.NO_CONTENT, (err, res) => {
                if (err) return done(err);

                models.Language.findOne({where: {id: language.id}})
                    .then((data) => {
                        should.equal(data, null);
                        done();
                    });
            });
    });
});

describe('PUT /language', () => {
    it('should update the language description', async () => {
        let record = await models.Language.findOne({});

        let language = {
            description: "changed description"
        };

        request(app)
            .put(`/api/language/${record.id}`)
            .set('Accept', 'application/json')
            .send(language)
            .expect(HttpStatusCode.NO_CONTENT, (err, res) => {
                if (err) throw new Error();

                models.Language.findOne({where: {id: record.id}})
                    .then((data) => {
                        data.description.should.equal(language.description);
                    });
            });
    })
});