var express = require('express');
var config = require('./app/config.js');
var runner = require('./app/runner.js');

var app = express();

app.use(express.static(__dirname));

//app.listen(1337);

function scan() {
  console.log('scanning');
  runner.scan(config.sources, 2, 7, function (results) {
    console.log(results);
  });
  //setTimeout(scan, config.scanFrequency);
}

scan();