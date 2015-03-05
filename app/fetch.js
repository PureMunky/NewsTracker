'use strict';

var http = require('http'),
  fs = require('fs');

function _fetchURL(url, callback) {
  http.get(url, function (res) {
    var body = '';

    res.on('data', function (chunk) {
      body += chunk;
    });

    res.on('end', function () {
      callback(body);
    })
  });
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