const assert = require('assert');
const supertest = require('supertest');
// const expect = require('chai');
// const app = require('../routes/artists/index');
const app = require('../app');
// console.log(app)

describe('Artists API', () => {
  it('should get a list of artists', async () => {

    const response = await supertest(app)
      .get('/api/artists');

    assert.strictEqual(response.status, 200);

  });
});

