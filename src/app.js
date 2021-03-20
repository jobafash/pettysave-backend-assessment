const express = require('express');

const app = express();

app.all('*', (request, response) => {
  response.status(404).json({
    status: 'error',
    error: 'resource not found',
  });
});

module.exports = app;
