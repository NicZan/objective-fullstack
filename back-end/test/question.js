process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;

let server = require('../server.js');

describe('test if food lasanha', function() {

    it('should get start conversation', function (done) {
        chai.request(server)
            .get('/api/v1/start')
            .end(function (err, res) {

                expect(res.status).to.eql(200);
                expect(res.body.message).to.not.be.undefined;
                expect(res.body.message).to.eql("Conversa iniciada");
                expect(res.body.result).to.not.be.undefined;
                expect(res.body.result).to.eql("Pense em um prato que gosta");

                done();
            });
    });

    it('should get next conversation', function (done) {
        chai.request(server)
            .post('/api/v1/next/question')
            .send({sequence: [] , isOver: false})
            .end(function (err, res) {

                expect(res.status).to.eql(200);
                expect(res.body.message).to.not.be.undefined;
                expect(res.body.message).to.eql("Próxima pergunta buscada.");
                expect(res.body.finish).to.not.be.undefined;
                expect(res.body.finish).to.eql(false);
                expect(res.body.result).to.not.be.undefined;
                expect(res.body.result).to.eql("O prato que pensou é massa?");

                done();
            });
    });

    it('should get next conversation', function (done) {
        chai.request(server)
            .post('/api/v1/next/question')
            .send({sequence: ["left"] , isOver: false})
            .end(function (err, res) {

                expect(res.status).to.eql(200);
                expect(res.body.message).to.not.be.undefined;
                expect(res.body.message).to.eql("Próxima pergunta buscada.");
                expect(res.body.finish).to.not.be.undefined;
                expect(res.body.finish).to.eql(true);
                expect(res.body.result).to.not.be.undefined;
                expect(res.body.result).to.eql("O prato que pensou é lasanha?");

                done();
            });
    });

    it('should get next conversation', function (done) {
        chai.request(server)
            .post('/api/v1/next/question')
            .send({sequence: ["left","left"] , isOver: true})
            .end(function (err, res) {

                expect(res.status).to.eql(200);
                expect(res.body.message).to.not.be.undefined;
                expect(res.body.message).to.eql("Próxima pergunta buscada.");
                expect(res.body.finish).to.not.be.undefined;
                expect(res.body.finish).to.eql(true);
                expect(res.body.result).to.not.be.undefined;
                expect(res.body.result).to.eql("Acertei de novo!");

                done();
            });
    });
});

describe('test if food bolo de chocolate', function() {

    it('should get start conversation', function (done) {
        chai.request(server)
            .get('/api/v1/start')
            .end(function (err, res) {

                expect(res.status).to.eql(200);
                expect(res.body.message).to.not.be.undefined;
                expect(res.body.message).to.eql("Conversa iniciada");
                expect(res.body.result).to.not.be.undefined;
                expect(res.body.result).to.eql("Pense em um prato que gosta");

                done();
            });
    });

    it('should get next conversation', function (done) {
        chai.request(server)
            .post('/api/v1/next/question')
            .send({sequence: [] , isOver: false})
            .end(function (err, res) {

                expect(res.status).to.eql(200);
                expect(res.body.message).to.not.be.undefined;
                expect(res.body.message).to.eql("Próxima pergunta buscada.");
                expect(res.body.finish).to.not.be.undefined;
                expect(res.body.finish).to.eql(false);
                expect(res.body.result).to.not.be.undefined;
                expect(res.body.result).to.eql("O prato que pensou é massa?");

                done();
            });
    });

    it('should get next conversation', function (done) {
        chai.request(server)
            .post('/api/v1/next/question')
            .send({sequence: ["right"] , isOver: false})
            .end(function (err, res) {

                expect(res.status).to.eql(200);
                expect(res.body.message).to.not.be.undefined;
                expect(res.body.message).to.eql("Próxima pergunta buscada.");
                expect(res.body.finish).to.not.be.undefined;
                expect(res.body.finish).to.eql(true);
                expect(res.body.result).to.not.be.undefined;
                expect(res.body.result).to.eql("O prato que pensou é Bolo de Chocolate?");

                done();
            });
    });

    it('should get next conversation', function (done) {
        chai.request(server)
            .post('/api/v1/next/question')
            .send({sequence: ["right","left"] , isOver: true})
            .end(function (err, res) {

                expect(res.status).to.eql(200);
                expect(res.body.message).to.not.be.undefined;
                expect(res.body.message).to.eql("Próxima pergunta buscada.");
                expect(res.body.finish).to.not.be.undefined;
                expect(res.body.finish).to.eql(true);
                expect(res.body.result).to.not.be.undefined;
                expect(res.body.result).to.eql("Acertei de novo!");

                done();
            });
    });
});

describe('add new food if not bolo de chocolate', function() {

    it('should get start conversation', function (done) {
        chai.request(server)
            .get('/api/v1/start')
            .end(function (err, res) {

                expect(res.status).to.eql(200);
                expect(res.body.message).to.not.be.undefined;
                expect(res.body.message).to.eql("Conversa iniciada");
                expect(res.body.result).to.not.be.undefined;
                expect(res.body.result).to.eql("Pense em um prato que gosta");

                done();
            });
    });

    it('should get next conversation', function (done) {
        chai.request(server)
            .post('/api/v1/next/question')
            .send({sequence: [] , isOver: false})
            .end(function (err, res) {

                expect(res.status).to.eql(200);
                expect(res.body.message).to.not.be.undefined;
                expect(res.body.message).to.eql("Próxima pergunta buscada.");
                expect(res.body.finish).to.not.be.undefined;
                expect(res.body.finish).to.eql(false);
                expect(res.body.result).to.not.be.undefined;
                expect(res.body.result).to.eql("O prato que pensou é massa?");

                done();
            });
    });

    it('should get next conversation', function (done) {
        chai.request(server)
            .post('/api/v1/next/question')
            .send({sequence: ["right"] , isOver: false})
            .end(function (err, res) {

                expect(res.status).to.eql(200);
                expect(res.body.message).to.not.be.undefined;
                expect(res.body.message).to.eql("Próxima pergunta buscada.");
                expect(res.body.finish).to.not.be.undefined;
                expect(res.body.finish).to.eql(true);
                expect(res.body.result).to.not.be.undefined;
                expect(res.body.result).to.eql("O prato que pensou é Bolo de Chocolate?");

                done();
            });
    });

    it('should get next conversation', function (done) {
        chai.request(server)
            .post('/api/v1/next/question')
            .send({sequence: ["right","right"] , isOver: true})
            .end(function (err, res) {

                expect(res.status).to.eql(200);
                expect(res.body.message).to.not.be.undefined;
                expect(res.body.message).to.eql("Próxima pergunta buscada.");
                expect(res.body.finish).to.not.be.undefined;
                expect(res.body.finish).to.eql(true);
                expect(res.body.result).to.not.be.undefined;
                expect(res.body.result).to.eql("Qual prato você pensou?");

                done();
            });
    });

    it('should add new question', function (done) {
        chai.request(server)
            .post('/api/v1/question')
            .send({sequence: ["right"], feature: "bebida", food: "leite" })
            .end(function (err, res) {

                expect(res.status).to.eql(200);
                expect(res.body.message).to.not.be.undefined;
                expect(res.body.message).to.eql("Pergunta adicionada.");

                done();
            });
    });
});

describe('test if food leite', function() {

    it('should get start conversation', function (done) {
        chai.request(server)
            .get('/api/v1/start')
            .end(function (err, res) {

                expect(res.status).to.eql(200);
                expect(res.body.message).to.not.be.undefined;
                expect(res.body.message).to.eql("Conversa iniciada");
                expect(res.body.result).to.not.be.undefined;
                expect(res.body.result).to.eql("Pense em um prato que gosta");

                done();
            });
    });

    it('should get next conversation', function (done) {
        chai.request(server)
            .post('/api/v1/next/question')
            .send({sequence: [] , isOver: false})
            .end(function (err, res) {

                expect(res.status).to.eql(200);
                expect(res.body.message).to.not.be.undefined;
                expect(res.body.message).to.eql("Próxima pergunta buscada.");
                expect(res.body.finish).to.not.be.undefined;
                expect(res.body.finish).to.eql(false);
                expect(res.body.result).to.not.be.undefined;
                expect(res.body.result).to.eql("O prato que pensou é massa?");

                done();
            });
    });

    it('should get next conversation', function (done) {
        chai.request(server)
            .post('/api/v1/next/question')
            .send({sequence: ["right"] , isOver: false})
            .end(function (err, res) {

                expect(res.status).to.eql(200);
                expect(res.body.message).to.not.be.undefined;
                expect(res.body.message).to.eql("Próxima pergunta buscada.");
                expect(res.body.finish).to.not.be.undefined;
                expect(res.body.finish).to.eql(false);
                expect(res.body.result).to.not.be.undefined;
                expect(res.body.result).to.eql("O prato que pensou é bebida?");

                done();
            });
    });

    it('should get next conversation', function (done) {
        chai.request(server)
            .post('/api/v1/next/question')
            .send({sequence: ["right","left"] , isOver: false})
            .end(function (err, res) {

                expect(res.status).to.eql(200);
                expect(res.body.message).to.not.be.undefined;
                expect(res.body.message).to.eql("Próxima pergunta buscada.");
                expect(res.body.finish).to.not.be.undefined;
                expect(res.body.finish).to.eql(true);
                expect(res.body.result).to.not.be.undefined;
                expect(res.body.result).to.eql("O prato que pensou é leite?");

                done();
            });
    });

    it('should get next conversation', function (done) {
        chai.request(server)
            .post('/api/v1/next/question')
            .send({sequence: ["right","left","left"] , isOver: true})
            .end(function (err, res) {

                expect(res.status).to.eql(200);
                expect(res.body.message).to.not.be.undefined;
                expect(res.body.message).to.eql("Próxima pergunta buscada.");
                expect(res.body.finish).to.not.be.undefined;
                expect(res.body.finish).to.eql(true);
                expect(res.body.result).to.not.be.undefined;
                expect(res.body.result).to.eql("Acertei de novo!");

                done();
            });
    });
});

describe('add new food if not lasanha', function() {

    it('should get start conversation', function (done) {
        chai.request(server)
            .get('/api/v1/start')
            .end(function (err, res) {

                expect(res.status).to.eql(200);
                expect(res.body.message).to.not.be.undefined;
                expect(res.body.message).to.eql("Conversa iniciada");
                expect(res.body.result).to.not.be.undefined;
                expect(res.body.result).to.eql("Pense em um prato que gosta");

                done();
            });
    });

    it('should get next conversation', function (done) {
        chai.request(server)
            .post('/api/v1/next/question')
            .send({sequence: [] , isOver: false})
            .end(function (err, res) {

                expect(res.status).to.eql(200);
                expect(res.body.message).to.not.be.undefined;
                expect(res.body.message).to.eql("Próxima pergunta buscada.");
                expect(res.body.finish).to.not.be.undefined;
                expect(res.body.finish).to.eql(false);
                expect(res.body.result).to.not.be.undefined;
                expect(res.body.result).to.eql("O prato que pensou é massa?");

                done();
            });
    });

    it('should get next conversation', function (done) {
        chai.request(server)
            .post('/api/v1/next/question')
            .send({sequence: ["left"] , isOver: false})
            .end(function (err, res) {

                expect(res.status).to.eql(200);
                expect(res.body.message).to.not.be.undefined;
                expect(res.body.message).to.eql("Próxima pergunta buscada.");
                expect(res.body.finish).to.not.be.undefined;
                expect(res.body.finish).to.eql(true);
                expect(res.body.result).to.not.be.undefined;
                expect(res.body.result).to.eql("O prato que pensou é lasanha?");

                done();
            });
    });

    it('should get next conversation', function (done) {
        chai.request(server)
            .post('/api/v1/next/question')
            .send({sequence: ["left","right"] , isOver: true})
            .end(function (err, res) {

                expect(res.status).to.eql(200);
                expect(res.body.message).to.not.be.undefined;
                expect(res.body.message).to.eql("Próxima pergunta buscada.");
                expect(res.body.finish).to.not.be.undefined;
                expect(res.body.finish).to.eql(true);
                expect(res.body.result).to.not.be.undefined;
                expect(res.body.result).to.eql("Qual prato você pensou?");

                done();
            });
    });

    it('should add new question', function (done) {
        chai.request(server)
            .post('/api/v1/question')
            .send({sequence: ["left"], feature: "fofinho", food: "pão" })
            .end(function (err, res) {

                expect(res.status).to.eql(200);
                expect(res.body.message).to.not.be.undefined;
                expect(res.body.message).to.eql("Pergunta adicionada.");

                done();
            });
    });
});

describe('test if food pão', function() {

    it('should get start conversation', function (done) {
        chai.request(server)
            .get('/api/v1/start')
            .end(function (err, res) {

                expect(res.status).to.eql(200);
                expect(res.body.message).to.not.be.undefined;
                expect(res.body.message).to.eql("Conversa iniciada");
                expect(res.body.result).to.not.be.undefined;
                expect(res.body.result).to.eql("Pense em um prato que gosta");

                done();
            });
    });

    it('should get next conversation', function (done) {
        chai.request(server)
            .post('/api/v1/next/question')
            .send({sequence: [] , isOver: false})
            .end(function (err, res) {

                expect(res.status).to.eql(200);
                expect(res.body.message).to.not.be.undefined;
                expect(res.body.message).to.eql("Próxima pergunta buscada.");
                expect(res.body.finish).to.not.be.undefined;
                expect(res.body.finish).to.eql(false);
                expect(res.body.result).to.not.be.undefined;
                expect(res.body.result).to.eql("O prato que pensou é massa?");

                done();
            });
    });

    it('should get next conversation', function (done) {
        chai.request(server)
            .post('/api/v1/next/question')
            .send({sequence: ["left"] , isOver: false})
            .end(function (err, res) {

                expect(res.status).to.eql(200);
                expect(res.body.message).to.not.be.undefined;
                expect(res.body.message).to.eql("Próxima pergunta buscada.");
                expect(res.body.finish).to.not.be.undefined;
                expect(res.body.finish).to.eql(false);
                expect(res.body.result).to.not.be.undefined;
                expect(res.body.result).to.eql("O prato que pensou é fofinho?");

                done();
            });
    });

    it('should get next conversation', function (done) {
        chai.request(server)
            .post('/api/v1/next/question')
            .send({sequence: ["left","left"] , isOver: false})
            .end(function (err, res) {

                expect(res.status).to.eql(200);
                expect(res.body.message).to.not.be.undefined;
                expect(res.body.message).to.eql("Próxima pergunta buscada.");
                expect(res.body.finish).to.not.be.undefined;
                expect(res.body.finish).to.eql(true);
                expect(res.body.result).to.not.be.undefined;
                expect(res.body.result).to.eql("O prato que pensou é pão?");

                done();
            });
    });

    it('should get next conversation', function (done) {
        chai.request(server)
            .post('/api/v1/next/question')
            .send({sequence: ["left","left","left"] , isOver: true})
            .end(function (err, res) {

                expect(res.status).to.eql(200);
                expect(res.body.message).to.not.be.undefined;
                expect(res.body.message).to.eql("Próxima pergunta buscada.");
                expect(res.body.finish).to.not.be.undefined;
                expect(res.body.finish).to.eql(true);
                expect(res.body.result).to.not.be.undefined;
                expect(res.body.result).to.eql("Acertei de novo!");

                done();
            });
    });
});