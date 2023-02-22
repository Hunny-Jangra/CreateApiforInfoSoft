const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./router/userRouter');

const app = express();

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

app.use('/', userRouter);

module.exports = app;