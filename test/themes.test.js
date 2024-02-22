const request = require('supertest');
const assert = require('assert');
const express = require('express');
const themesRouter = require('../routes/themes/index');

const app = express();
app.use('/api/themes', themesRouter);

describe('get themes endpoint', () => {
  it('should return 24 themes', (done) => {
    request(app)
      .get('/api/themes')
      .expect(200)
      .end((err, res) => {
        assert.strictEqual(res.body.length, 24);
        done();
      });
  });
});

