var log = [];

function _write(strMessage){
  if(writeToConsole) {
    console.log(strMessage);
  }
}

function _getLog() {
  return [{
    Message: 'mock log',
    TimeStamp: new Date()
  }];
}

function _clear() {
  
}

module.exports.write = _write;
module.exports.getLog = _getLog;
module.exports.clear = _clear;

// MOCK UTILS
var writeToConsole = false;
function setWriteToConsole(value) {
  writeToConsole = value;
}

module.exports.setWriteToConsole = setWriteToConsole;