'use strict';

function _compare(first, second, options) {
  var keys = Object.keys(second),
    first = first || {},
    i = 0,
    options = options || {},
    changes = {};

  options.percChange = options.percChange || 0;

  for (i = 0; i < keys.length; i++) {
    _comparePhrase(first[keys[i]], second[keys[i]]);
    if (second[keys[i]].perc > options.percChange || second[keys[i]].perc < (-1 * options.percChange)) {
      changes[keys[i]] = second[keys[i]];
    }
  }

  return changes;
}

function _comparePhrase(first, second) {
  if (first) {
    second.perc = ((second.qty - first.qty) / second.qty);
    second.new = false;
  } else {
    second.perc = Infinity;
    second.new = true;
  }
}

module.exports.compare = _compare;