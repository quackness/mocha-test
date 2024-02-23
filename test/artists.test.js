const assert = require('assert');
const supertest = require('supertest');
const express = require('express');
const artistsRouter = require('../routes/artists/index');
const app = express();

app.use('/api/artists', artistsRouter);


describe('Artists API', () => {
  it('should return 200 upon calling the get artists endpoint', (done) => {
    supertest(app)
      .get('/api/artists')
      .expect(200)
      .end((err, res) => {
        console.log(res.body.length)
        assert.strictEqual(res.status, 200);
        done();
      });
  });
  it('should update artist name', (done) => {
    //add the new artist name so it can be edited later
    supertest(app)
      .post('/api/artists')
      .send({ Name: 'EditTest' })
      .expect(201)
      .end((error, response) => {
        if (error) return done(error);

        const id = response.body.lastInsertRowid;
        //edit the name
        supertest(app)
          .patch(`/api/artists/${id}`)
          .send({ Name: "hasBeenEdited" })
          .expect(200)
          .end((err, res) => {
            assert.strictEqual(res.body.changes, 1);
            done();
          });
      })
  });
});



//https://github.com/danielfsousa/express-rest-boilerplate/blob/e5b619810d91075931e81f7014795313bb949552/src/api/tests/integration/user.test.js#L409
//     delete dbUsers.branStark.password;
//     const id = (await User.findOne(dbUsers.branStark))._id;
//     const { name } = user;

//     return request(app)
//       .patch(`/v1/users/${id}`)
//       .set('Authorization', `Bearer ${adminAccessToken}`)
//       .send({ name })
//       .expect(httpStatus.OK)
//       .then((res) => {
//         expect(res.body.name).to.be.equal(name);
//         expect(res.body.email).to.be.equal(dbUsers.branStark.email);
//       });
//   });
// });
// let server;
// beforeEach(function () {
//   delete require.cache[require.resolve('../app')];
//   server = require('../app');
// });
// afterEach(function (done) {
//   server.close(done);
// });
// it('should return status 200 upon connection', () => {
//   return async () => {
//     const response = await supertest(server)
//       .get('/api/artists');
//     assert.strictEqual(response.status, 200);
//     assert.strictEqual(response.header['content-type'], 'application/json; charset=utf-8');
//   };
// });
// });


//credits: https://glebbahmutov.com/blog/how-to-correctly-unit-test-express-server/
//https://stackoverflow.com/questions/49789886/how-to-correctly-close-express-server-between-tests-using-mocha-and-chai
//https://www.geeksforgeeks.org/express-js-app-listen-function/
//https://medium.com/spidernitt/testing-with-mocha-and-chai-b8da8d2e10f2
//video purposes