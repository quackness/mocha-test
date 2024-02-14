const assert = require('assert');
const supertest = require('supertest');
const app = require('../app');

describe('Artists API', () => {
  it('should return status 200 upon connection', async () => {
    const response = await supertest(app)
      .get('/api/artists');
    console.log(response)
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.header['content-type'], 'application/json; charset=utf-8');

  });
});

