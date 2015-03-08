'use strict';

var fetch = require('./fetch.js'),
  parse = require('./parse.js');

var results = {};
var summary = {};
var scanCount = 0;
var scanned = 0;

// Scans all the urls to the depth and filters based on criteria.
function _scan(urls, depth, greaterThan, callback) {
  _reset();

  var i = 0;
  var urlArray = (typeof urls === 'string') ? [urls] : urls;

  for (i = 0; i < urlArray.length; i++) {
    _scanUrl(urlArray[i], depth, _finished(greaterThan, callback));
  }
};

// Brings the class back to ground-zero.
function _reset() {
  results = {};
  summary = {};
  summary.phrases = {};
  summary.urls = [];
  scanCount = 0;
  scanned = 0;
}

// Creates a the function to be called at the end.
function _finished(greaterThan, callback) {
  return function () {
    _filter(summary.phrases, greaterThan);
    callback(summary);
  }
}

// Scans a url to depth and signals finished if it's the last url.
function _scanUrl(url, depth, doneCallback) {
  if (!results[url] && depth > 0) {
    scanCount++;
    summary.urls.push(url);

    fetch.URL(url, function (data) {
      var rtn = parse.parse(data, 1, 3);
      var i = 0;
      results[url] = data;

      _sum(rtn.phrases);

      for (i = 0; i < rtn.urls.length; i++) {
        _scanUrl(rtn.urls[i], depth - 1, doneCallback);
      }

      scanned++;
      if (scanCount === scanned) {
        doneCallback();
      }
    });
  }
}

// Removes phrases below the threshold.
function _filter(phrases, greaterThan) {
  if (phrases) {
    var i = 0;
    var keys = Object.keys(phrases);

    for (i = 0; i < keys.length; i++) {
      if (phrases[keys[i]].qty <= greaterThan) {
        delete phrases[keys[i]];
      }
    }
  }
}

// Takes the data retrived and adds its results to the summary.
function _sum(phrases) {
  if (phrases) {
    var i = 0;
    var keys = Object.keys(phrases);

    for (i = 0; i < keys.length; i++) {
      if (summary.phrases[keys[i]]) {
        summary.phrases[keys[i]].qty += phrases[keys[i]].qty;
      } else {
        summary.phrases[keys[i]] = phrases[keys[i]];
      }
    }
  }
}

exports.scan = _scan;