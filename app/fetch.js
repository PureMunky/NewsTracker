'use strict';

var http = require('http');

function _fetchURL(url, callback) {
  http.get(url, callback);
};

exports.URL = _fetchURL;