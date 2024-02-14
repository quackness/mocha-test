const assert = require('assert');
const supertest = require('supertest');

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
  });
});


//credits: https://glebbahmutov.com/blog/how-to-correctly-unit-test-express-server/
//https://stackoverflow.com/questions/49789886/how-to-correctly-close-express-server-between-tests-using-mocha-and-chai
//https://www.geeksforgeeks.org/express-js-app-listen-function/
//https://medium.com/spidernitt/testing-with-mocha-and-chai-b8da8d2e10f2
