'use strict';

var http = require('http'),
  https = require('https'),
  fs = require('fs');

function resolve(res, callback) {
  var body = '';

  res.on('data', function (chunk) {
    body += chunk;
  });

  res.on('end', function () {
    callback(body);
  });
}

function _fetchURL(url, callback) {
  if (url.indexOf('https') == 0) {
    https.get(url, function (res) {
      resolve(res, callback);
    });
  } else if (url.indexOf('http') == 0) {
    http.get(url, function (res) {
      resolve(res, callback);
    });
  } else {
    callback('');
  }
};

function _fetchFile(path, callback) {
  fs.readFile(path, { encoding: 'utf-8' }, function (err, data) {
    var body = data;

    if (err !== null) body = '';

    callback(body);
  });
}

exports.URL = _fetchURL;
exports.File = _fetchFile;