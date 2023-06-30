const express = require('express');

const { userRoute, categoryRoute } = require('./routes');

const app = express();

app.use(express.json());

app.use('/', userRoute);
app.use('/', categoryRoute);

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

module.exports = app;
