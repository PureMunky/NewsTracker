var express = require('express');
var config = require('./app/config.js');
var runner = require('./app/runner.js');

var app = express();

var previous = '{}';

app.use(express.static(__dirname));

//app.listen(1337);

function scan() {
  console.log('scanning');
  runner.scan(config.sources, { depth: 2, previous: JSON.parse(previous) }, function (err, results) {
    console.log(results.changes);
    previous = JSON.stringify(results.phrases);

    setTimeout(scan, config.scanFrequency);
  });
}

scan();