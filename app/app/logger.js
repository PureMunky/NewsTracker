var log = [];

function _write(strMessage){
	//console.log(strMessage);
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

module.exports.write = _write;
module.exports.getLog = _getLog;
module.exports.clear = _clear;