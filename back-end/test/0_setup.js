process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;

let server = require('../server.js');

describe('test server run', function() {
    it('should test server can run', (done) => {
        expect(server).to.not.be.undefined;

        setTimeout(() => {
            done();
        }, 2500);
    });
});
