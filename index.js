const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5005

express()
  .use(express.static(path.join(__dirname, 'build')))
  .get('/*', function(req, res){
    res.sendFile(__dirname + '/build/index.html');
  })
  .listen(PORT)
