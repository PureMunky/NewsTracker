'use strict';

var http = require('http'),
  https = require('https'),
  fs = require('fs');

// Processes http and https resolutions.
function _resolve(res, callback) {
  var body = '';

  res.on('data', function (chunk) {
    body += chunk;
  });

  res.on('end', function () {
    callback(null, body);
  });
}

// Takes a url and fetches it through http or https also ignores other requests.
function _fetchURL(url, callback) {
  if (url.indexOf('https') == 0) {
    https.get(url, function (res) {
      _resolve(res, callback);
    }).on('error', function (e) {
      callback(e, null);
    });
  } else if (url.indexOf('http') == 0) {
    http.get(url, function (res) {
      _resolve(res, callback);
    }).on('error', function (e) {
      callback(e, null);
    });
  } else {
    callback(new Error('Not a Url'), null);
  }
};

// Gets the contents of a file.
function _fetchFile(path, callback) {
  fs.readFile(path, { encoding: 'utf-8' }, function (err, data) {
    callback(err, data);
  });
}

module.exports.URL = _fetchURL;
module.exports.File = _fetchFile;