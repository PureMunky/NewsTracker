var fetch = require('./fetch.js');
var parse = require('./parse.js');
var config = require('./config.js');

var results = {};
var summary = {};
var scanCount = 0;
var scanned = 0;

exports.scan = function (depth) {
  var i = 0;

  for (i = 0; i < config.sources.length; i++) {
    _scanUrl(config.sources[i], depth, _finished);
  }
};

function _finished(results) {
  console.log(summary);
}

function _scanUrl(url, depth, doneCallback) {
  if (!results[url] && depth > 0) {
    scanCount++;
    fetch.URL(url, function (data) {
      //console.log(data);
      var rtn = parse.parse(data, 1, 3);
      var i = 0;
      results[url] = data;
      //console.log(url);
      //console.log(rtn);
      _sum(rtn.phrases);

      for (i = 0; i < rtn.urls.length; i++) {
        _scanUrl(rtn.urls[i], depth - 1, doneCallback);
      }

      scanned++;
      if (scanCount === scanned) {
        doneCallback(results);
      }
    });
  }
}

function _sum(result) {
  if (result) {
    var i = 0;
    var keys = Object.keys(result);

    for (i = 0; i < keys.length; i++) {
      if (result[keys[i]].qty >= 7 && result[keys[i]].qty < 20) {
        summary[keys[i]] = result[keys[i]];
      }
    }
  }
}