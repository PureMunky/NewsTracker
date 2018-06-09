var log = [];

function _write(strMessage){
	log.push({
    Message: strMessage,
    TimeStamp: new Date()
  });  
}

function _getLog() {
  return log;
}

function _clear() {
  log = [];
}

exports.write = _write;
exports.getLog = _getLog;
exports.clear = _clear;