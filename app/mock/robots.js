function parse(robot) {
  return {
    UserAgent: '*',
    Disallow: []
  };
}

function check(robot, url) {
  return true;
}

function store(robot) {
  
}

function getLocation(url) {
  return url + '/robots.txt';
}

module.exports.parse = parse;
module.exports.check = check;
module.exports.store = store;
module.exports.getLocation = getLocation;