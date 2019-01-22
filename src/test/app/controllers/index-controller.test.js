'use strict';
const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const app = require('../../../server');

describe('Checking if server is running', () => {
    it('Returns a 200 response', (done) => {
        chai.request(app)
            .get('/server-info')
            .end((error, response) => {
                if (error) done(error);
                // Now let's check our response
                expect(response).to.have.status(200);
                done();
            });
    });

    it('Cheking return /server-info', (done) => {
        chai.request(app)
            .get('/server-info')
            .end((error, response) => {
                if (error) done(error);
                expect(response.body).to.be.deep.equal(
                    {
                        message: "The server is running!",
                        version: "1.0.0",
                        author: "André Ximenes",
                        repository: "https://github.com/andreximenes/node-server-es6"
                    }
                );
                done();
            });
    });
});

