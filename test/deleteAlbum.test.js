const request = require('supertest');
const chai = require('chai');
const assert = chai.assert;
const express = require('express');
const deleteAlbumRouter = require('../routes/albums/index');

const app = express();
app.use('/api/albums', deleteAlbumRouter);

describe('DELETE /api/albums/:id', () => {
  it('should delete an album and return success', (done) => {
    // add a test album to delete later
    request(app)
      .post('/api/albums')
      .type("application/json")
      .send({
        Title: 'Test Album',
        ReleaseYear: 2022,
        ArtistId: 2,
      })
      .expect(201)
      .end((error, response) => {
        if (error) return done(error);
        const albumIdToDelete = response.body.lastInsertRowid;
        console.log(albumIdToDelete);
        //delete the album
        request(app)
          .delete(`/api/albums/${albumIdToDelete}`)
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            assert.strictEqual(res.body.changes, 1);
            done();
          });
      });
  });

  it('should return 404 if the album id you are trying to delete does not exist', (done) => {
    request(app)
      //this id does not exist in a db
      .delete('/api/albums/45678909')
      .expect(404)
      .end((err, res) => {
        if (err) return done(err);
        assert.strictEqual(res.body.changes, 0);
        done();
      });
  });
});
