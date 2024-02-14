const assert = require('assert');
const supertest = require('supertest');
// const app = require('../app');

describe('Artists API', () => {
  let server;
  beforeEach(function () {
    delete require.cache[require.resolve('../app')];
    server = require('../app');
  });
  afterEach(function (done) {
    server.close(done);
  });
  it('should return status 200 upon connection', () => {
    return async () => {
      const response = await supertest(server)
        .get('/api/artists');
      assert.strictEqual(response.status, 200);
      assert.strictEqual(response.header['content-type'], 'application/json; charset=utf-8');
    };

    // return;
  });
});

