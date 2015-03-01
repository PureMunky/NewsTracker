'use strict';

// Processes string data for information.
function _parse(data, clusterMin, clusterMax) {
  var urls = _getUrls(data),
    phrases = _getPhrases(data, clusterMin, clusterMax);

  return {
    phrases: phrases,
    urls: urls
  };
}

// removes all html tags and lower cases the data.
function _stripHtmlTags(data) {
  return data.replace(/<[^>]*>/g, ' ').replace(/\s{2,}/g, ' ').trim().toLowerCase();
}

// parses string data into logical phrases.
function _getPhrases(data, clusterMin, clusterMax) {
  var stripped = _stripHtmlTags(data).split(' '),
    i = 0,
    j = 0,
    phrases = {},
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

  return phrases;
}

// parses html for urls.
function _getUrls(data) {
  var rtnUrls = [],
    i = 0;

  rtnUrls = data.split(/href="/);
  rtnUrls.splice(0, 1);

  for (i = 0; i < rtnUrls.length; i++) {
    rtnUrls[i] = rtnUrls[i].split(/"/)[0];
  }

  //rtnUrls = data.match(/href=[\'"]?([^\'" >]+)/g);

  return rtnUrls;
}

exports.parse = _parse;
exports.html = _stripHtmlTags;