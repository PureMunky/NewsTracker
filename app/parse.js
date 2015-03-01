'use strict';

// Parses string data into a logical phrases.
function _parse(data, clusterMin, clusterMax) {
  var stripped = _stripHtmlTags(data).split(' '),
    urls = _getUrls(data),
    phrases = {},
    i = 0,
    j = 0,
    phrase;

  for (i = 0; i < stripped.length + 1 - (clusterMax - clusterMin) ; i++) {
    phrase = '';

    for (j = 0; j < clusterMax && i + j <= stripped.length; j++) {
      phrase += (j > 0 ? ' ' : '') + stripped[i + j];

      if (j + 1 >= clusterMin) {
        if (phrases[phrase]) {
          phrases[phrase].qty++;
        } else {
          phrases[phrase] = {
            text: phrase,
            qty: 1
          }
        }
      }
    }
  }

  return {
    phrases: phrases,
    urls: urls
  };
}

// removes all html tags and lower cases the data.
function _stripHtmlTags(data) {
  return data.replace(/<[^>]*>/g, ' ').replace(/\s{2,}/g, ' ').trim().toLowerCase();
}

function _getUrls(data) {
  var rtnUrls = [],
    i = 0;

  rtnUrls = data.split(/href="/);
  rtnUrls.splice(0, 1);

  for (i = 0; i < rtnUrls.length; i++) {
    rtnUrls[i] = rtnUrls[i].split(/"/)[0];
  }

  return rtnUrls;
}

exports.parse = _parse;
exports.html = _stripHtmlTags;