const express = require('express');
const helmet = require('helmet');
const postsRouter = require('./posts/posts-router');
const usersRouter = require('./users/users-router');
const nameToUpperCase = require('./data/middleware/nameToUpperCase')

const server = express();

// middleware
server.use(express.json());
server.use(helmet());
server.use(nameToUpperCase);

// Routing
server.use('/api/posts', postsRouter);
server.use('/api/users', usersRouter);


// Route Handlers
server.get('/', (req, res) => {
    res.send(`
    <h2>Post City Bitch</h2>
    <p>Welcome to the Jungle</p>
    `)
});

module.exports = server;