const request = require('supertest');
const chai = require('chai');
const assert = chai.assert;
const express = require('express');
const artistRouter = require('../routes/artists/index');

const app = express();
app.use('/api/artists', artistRouter);

describe('POST /api/artists', () => {
  it('should return a validation error when artist name is not provided', (done) => {
    request(app)
      .post('/api/artists')
      .send({ Name: '' })//impitate blank field
      .expect(422)//taken from the front end file
      .end((err, res) => {
        assert.strictEqual(res.body[0].message, '"Name" is not allowed to be empty');
        done();
      });
  });
});
