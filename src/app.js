const express = require('express');

const { userRoute } = require('./routes');

const app = express();

app.use(express.json());

app.use('/', userRoute);

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

module.exports = app;
