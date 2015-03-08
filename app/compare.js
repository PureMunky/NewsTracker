'use strict';

function _compare(first, second) {
  var keys = Object.keys(second),
    first = first || {},
    i = 0;

  for (i = 0; i < keys.length; i++) {
    _comparePhrase(first[keys[i]], second[keys[i]]);
  }

  return second;
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