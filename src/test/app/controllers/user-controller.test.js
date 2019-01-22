const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const app = require('../../../server');

describe('User Controller', () => {
    describe('Register new User', () => {
        it('Returns a 200 response', () => {
            return chai.request(app)
                .post('/users/register')
                .send({
                    name: 'John Doe',
                    email: 'johndoe@example.com',
                    password: '123456'
                })
                .then(response => {
                    expect(response).to.have.status(200);

                })
            done();
        });
    });
});