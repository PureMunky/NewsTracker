'use strict';

var storedRobot = {};

function _check (robot, url) {
  var rob = url ? _parseRobotFile(robot) : storedRobot,
    url = url || robot,
    i = 0,
    rtn = true;

  if(rob.Disallow) {
    for (i = 0; i < rob.Disallow.length; i++) {
      if(url.replace(/https?:\/\//, '').indexOf(rob.Disallow[i]) > 5){
        rtn = false;
      }
    }
  }

  return rtn;
}

function _parseRobotFile(robot) {
  var result = {
    UserAgent: '*',
    Disallow: []
  },
    rob = robot.split('\n'),
    i = 0;

  for(i = 0; i < rob.length; i++) {
    if (rob[i].split(':')[0] === 'User-agent') {
      result.UserAgent = rob[i].split(':')[1].trim();
    } else if (rob[i].split(':')[0] === 'Disallow') {
      result.Disallow.push(rob[i].split(':')[1].trim());
    }
  }

  return result;
}

function _storeRobotFile (robot) {
  storedRobot = _parseRobotFile(robot);
}

function _getLocation (url) {
  var rtn = '',
    prefix = 'http://';

if(url.indexOf('https://') > -1) {
  prefix = 'https://';
}

  url = url.replace(/https?:\/\//, '');

  url = prefix + url.substring(0, url.indexOf('/') + 1) + 'robots.txt'; 

  return url;
}

module.exports.parse = _parseRobotFile;
module.exports.check = _check;
module.exports.store = _storeRobotFile;
module.exports.getLocation = _getLocation;