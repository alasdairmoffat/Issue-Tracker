/*
 *
 *
 *       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]-----
 *       (if additional are added, keep them at the very end!)
 */

/* global suite test suiteTeardown */

const chaiHttp = require('chai-http');
const chai = require('chai');

const { assert } = chai;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {
  suiteTeardown(async () => {
    server.stop();
  });

  let _id1;
  let _id2;

  suite('POST /api/issues/{project} => object with issue data', () => {
    test('Every field filled in', (done) => {
      chai
        .request(server)
        .post('/api/issues/test')
        .send({
          issue_title: 'Title',
          issue_text: 'text',
          created_by: 'Functional Test - Every field filled in',
          assigned_to: 'Chai and Mocha',
          status_text: 'In QA',
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.issue_title, 'Title');
          assert.equal(res.body.issue_text, 'text');
          assert.equal(res.body.created_by, 'Functional Test - Every field filled in');
          assert.equal(res.body.assigned_to, 'Chai and Mocha');
          assert.equal(res.body.status_text, 'In QA');

          _id1 = res.body._id;

          done();
        });
    });

    test('Required fields filled in', (done) => {
      const tests = {
        issue_title: 'Title',
        issue_text: 'text',
        created_by: 'Functional Test - Required fields filled in',
      };

      chai
        .request(server)
        .post('/api/issues/test')
        .send(tests)
        .end((err, res) => {
          assert.equal(res.status, 200);
          Object.keys(tests).forEach((key) => {
            assert.equal(res.body[key], tests[key]);
          });

          _id2 = res.body._id;

          done();
        });
    });

    test('Missing required fields', (done) => {
      chai
        .request(server)
        .post('/api/issues/test')
        .send({})
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'missing inputs');
          done();
        });
    });
  });

  suite('PUT /api/issues/{project} => text', () => {
    test('No body', (done) => {
      chai
        .request(server)
        .put('/api/issues/test')
        .send({ _id: _id1 })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'no updated field sent');
          done();
        });
    });

    test('One field to update', (done) => {
      chai
        .request(server)
        .put('/api/issues/test')
        .send({ _id: _id1, issue_text: 'updated text' })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.issue_text, 'updated text');
          done();
        });
    });

    test('Multiple fields to update', (done) => {
      chai
        .request(server)
        .put('/api/issues/test')
        .send({ _id: _id1, issue_text: 'even newer text', status_text: 'In QA' })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.issue_text, 'even newer text');
          assert.equal(res.body.status_text, 'In QA');
          done();
        });
    });
  });

  suite('GET /api/issues/{project} => Array of objects with issue data', () => {
    test('No filter', (done) => {
      chai
        .request(server)
        .get('/api/issues/test')
        .query({})
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          assert.property(res.body[0], 'issue_title');
          assert.property(res.body[0], 'issue_text');
          assert.property(res.body[0], 'created_on');
          assert.property(res.body[0], 'updated_on');
          assert.property(res.body[0], 'created_by');
          assert.property(res.body[0], 'assigned_to');
          assert.property(res.body[0], 'open');
          assert.property(res.body[0], 'status_text');
          assert.property(res.body[0], '_id');
          done();
        });
    });

    test('One filter', (done) => {
      chai
        .request(server)
        .get('/api/issues/test')
        .query({ issue_title: 'Title' })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          assert.property(res.body[0], 'issue_title');
          assert.property(res.body[0], 'issue_text');
          assert.property(res.body[0], 'created_on');
          assert.property(res.body[0], 'updated_on');
          assert.property(res.body[0], 'created_by');
          assert.property(res.body[0], 'assigned_to');
          assert.property(res.body[0], 'open');
          assert.property(res.body[0], 'status_text');
          assert.property(res.body[0], '_id');

          res.body.forEach((elem) => {
            assert.equal(elem.issue_title, 'Title');
          });
          done();
        });
    });

    test('Multiple filters (test for multiple fields you know will be in the db for a return)', (done) => {
      chai
        .request(server)
        .get('/api/issues/test')
        .query({ issue_title: 'Title', status_text: 'In QA' })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          assert.property(res.body[0], 'issue_title');
          assert.property(res.body[0], 'issue_text');
          assert.property(res.body[0], 'created_on');
          assert.property(res.body[0], 'updated_on');
          assert.property(res.body[0], 'created_by');
          assert.property(res.body[0], 'assigned_to');
          assert.property(res.body[0], 'open');
          assert.property(res.body[0], 'status_text');
          assert.property(res.body[0], '_id');

          res.body.forEach((elem) => {
            assert.equal(elem.issue_title, 'Title');
            assert.equal(elem.status_text, 'In QA');
          });
          done();
        });
    });
  });

  suite('DELETE /api/issues/{project} => text', () => {
    test('No _id', (done) => {
      chai
        .request(server)
        .delete('/api/issues/test')
        .send({})
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.text, '_id error');
          done();
        });
    });

    test('Valid _id', (done) => {
      chai
        .request(server)
        .delete('/api/issues/test')
        .send({ _id: _id1 })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.text, `deleted ${_id1}`);
          done();
        });
    });

    test('Delete other query', (done) => {
      chai
        .request(server)
        .delete('/api/issues/test')
        .send({ _id: _id2 })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.text, `deleted ${_id2}`);
          done();
        });
    });
  });
});
