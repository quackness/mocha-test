const express = require('express');
const app = express();
//serve static files 

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('_FrontendStarterFiles'));
//import routes 
const themesRouter = require('./routes/themes');
const artistsRouter = require('./routes/artists');
const albumsRouter = require('./routes/albums');
const tracksRouter = require('./routes/tracks');
const mediaTypes = require('./routes/mediaTypes');


//inject routes
app.use('/api/themes', themesRouter);
app.use('/api/artists', artistsRouter);
app.use('/api/albums', albumsRouter);
app.use('/api/tracks', tracksRouter);
app.use('/api/mediaTypes', mediaTypes);


const server = app.listen(3000, (done) => { "Listening on port 3000" });

module.exports = server;
//the front end statuses vs end point 200, 201 etc
//change origin
