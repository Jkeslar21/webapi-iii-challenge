const express = require('express');
const helmet = require('helmet');
const postsRouter = require('./posts/posts-router');
const usersRouter = require('./users/users-router');
// const nameToUpperCase = require('./data/middleware/nameToUpperCase')

const server = express();
const style = {
    color: 'green'
}
// middleware
server.use(express.json());
server.use(helmet());
// server.use(nameToUpperCase);

// Routing
server.use('/api/posts', postsRouter);
server.use('/api/users', usersRouter);


// Route Handlers
server.get('/', (req, res) => {
    res.send(`
    <h2 style={style}>Welcome to the Jungle</h2>
    `)
});

module.exports = server;