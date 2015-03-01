'use strict';

var http = require('http'),
  fs = require('fs');

function _fetchURL(url, callback) {
  http.get(url, callback);
};

function _fetchFile(path, callback) {
  fs.readFile(path, { encoding: 'utf-8' }, callback);
}

exports.URL = _fetchURL;
exports.File = _fetchFile;