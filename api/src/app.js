const express = require('express');
const index = require('./routes');
const movies = require('./routes/movies');
const users = require('./routes/users');
const cors = require('cors');

const server = express();

server.name = 'API';

server.use(express.json())
server.use(express.urlencoded({ extended: false }))

server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.use('/', index)
server.use('/movies', movies);
server.use('/user', users);

server.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  // eslint-disable-next-line no-console
  console.error(err);
  res.status(status).send(message);
});

module.exports = { server };
