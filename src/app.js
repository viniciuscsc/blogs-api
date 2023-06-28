const express = require('express');

const {
  authRouter,
  userRouter,
} = require('./routes');

const app = express();

app.use(express.json());

app.use('/login', authRouter);
app.use('/user', userRouter);

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

module.exports = app;
