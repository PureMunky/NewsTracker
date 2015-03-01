var express = require('express');
var config = require('./app/config.js');

var app = express();

app.use(express.static(__dirname));

app.listen(1337);

function scan() {
  console.log('scanning');

  setTimeout(scan, config.scanFrequency);
}

scan();