'use strict';

var urlReq = require('url');
var storedRobot = {};

// Checks if a url is disallowed by the passed (or stored) robots.txt data.
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

// Parses a robots.txt file and returns an object representing the data.
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

// Parses and stores a robots.txt for future validations.
function _storeRobotFile (robot) {
  storedRobot = _parseRobotFile(robot);
}

// Takes a url and determines the location of the robots.txt file.
function _getLocation (url) {
  return urlReq.resolve(url, '/robots.txt');
}

module.exports.parse = _parseRobotFile;
module.exports.check = _check;
module.exports.store = _storeRobotFile;
module.exports.getLocation = _getLocation;