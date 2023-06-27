const express = require('express');

const { authRouter } = require('./routes');

const app = express();

app.use(express.json());

app.use('/login', authRouter);

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

module.exports = app;
