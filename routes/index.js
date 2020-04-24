const express = require('express');

const app = express();

app.use(require('./checkout'));

module.exports = app;