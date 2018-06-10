
function compare(first, second, options) {
  return {
    'hello': {
      perc: Infinity,
      new: true
    },
    'goodbye': {
      perc: .1,
      new: false
    }
  };
}

module.exports.compare = compare;