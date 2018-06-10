var mockBody = '<html><head></head><body>hello friends</body></html>';

function fetchURL(url, callback) {
  callback(null, mockBody);
}

function fetchFile(path, callback) {
  callback(null, mockBody);
}

module.exports.URL = fetchURL;
module.exports.File = fetchFile;