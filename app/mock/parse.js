
function parse() {
  return {
    phrases: {
      'hello': {
        qty: 100,
        perc: Infinity
      },
      'testing': {
        qty: 50,
        perc: .50
      }
    },
    urls: [
      'https://www.google.com',
      'https://www.philcorbett.net'
    ]
  };
}

function html() {
  return 'hello';
}

module.exports.parse = parse;
module.exports.html = html;