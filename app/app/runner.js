'use strict';

var uow = require('../uow.js'),
  fetch = uow.require('fetch.js'),
  parse = uow.require('parse.js'),
  compare = uow.require('compare.js'),
  logger = uow.require('logger.js'),
  results = {},
  summary = {},
  scanCount = 0,
  scanned = 0;

// Scans all the urls to the depth and filters based on criteria.
function _scan(urls, options, callback) {
  logger.write('\n--------------\n');
  logger.write('start runner.js_scan');
  var i = 0,
    urlArray = (typeof urls === 'string') ? [urls] : urls,
    _options = options || {},
    callback = callback || options;

  _options.depth = options.depth || 1,
  _options.greaterThan = options.greaterThan || 7,
  _options.blacklist = options.blacklist || {},
  _options.percChange = options.percChange || 0.1;

  _reset();

  scanCount += urlArray.length;
  logger.write('urlArray.length: ' + urlArray.length);
  for (i = 0; i < urlArray.length; i++) {
    _scanUrl(
      urlArray[i],
      _options.depth,
      _options.blacklist,
      _finished(
        _options.greaterThan,
        _options.previous,
        _options.percChange,
        callback
      )
    );
  }
  logger.write('end runner.js_scan');
}

// Brings the class back to ground-zero.
function _reset() {
  logger.write('start runner.js _reset');
  results = {};
  summary = {};
  summary.phrases = {};
  summary.urls = [];
  summary.changes = {};
  summary.sources = [];
  scanCount = 0;
  scanned = 0;
}

// Creates a the function to be called at the end.
function _finished(greaterThan, previous, percChange, callback) {
  logger.write('start runner.js _finished');
  return function () {
    logger.write('runner.js is finished')
    _filter(summary.phrases, greaterThan);

    if (previous) { summary.changes = compare.compare(previous, summary.phrases, { percChange: percChange }); }

    callback(null, summary);
  }
  logger.write('end runner.js _finish');
}

// Scans a url to depth and signals finished if it's the last url.
function _scanUrl(url, depth, blacklist, doneCallback) {
  logger.write('start runner.js _scanUrl '  + url);
  if (!results[url] && depth > 0) {
      summary.urls.push(url);

      fetch.URL(url, function (err, data) {
        var rtn, i;

        if (!err) {
          rtn = parse.parse(data, 1, 3, blacklist);
          i = 0;
          results[url] = data;
          summary.sources.push({
            url: url,
            phrases: rtn.phrases
          });

          _sum(rtn.phrases);

          scanCount += rtn.urls.length;

          logger.write('scanCount: ' + scanCount);
          for (i = 0; i < rtn.urls.length; i++) {
            _scanUrl(rtn.urls[i], depth - 1, blacklist, doneCallback);
          }
        }
                
      scanned++;   
    });
  } else {
    scanned++;
  }
  
  logger.write('scanCount: ' + scanCount);
  logger.write('scanned: ' + scanned);
  if (scanCount === scanned) {
    doneCallback();
  }
  logger.write('end runner.js _scanUrl');
}

// Removes phrases below the threshold.
function _filter(phrases, greaterThan) {
  logger.write('start runner.js _filter');
  if (phrases) {
    var i = 0;
    var keys = Object.keys(phrases);

    for (i = 0; i < keys.length; i++) {
      if (phrases[keys[i]].qty <= greaterThan) {
        delete phrases[keys[i]];
      }
    }
  }
  logger.write('end runner.js _filter');
}

// Takes the data retrived and adds its results to the summary.
function _sum(phrases) {
  logger.write('start runner.js _sum');
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
  logger.write('end runner.js _sum');
}

module.exports.scan = _scan;