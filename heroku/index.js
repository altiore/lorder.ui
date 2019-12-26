const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5005;

express()
  .use(express.static(path.join(__dirname, '.')))
  .get('/*', function(req, res) {
    res.sendFile(__dirname + '/index.html');
  })
  .listen(PORT);
