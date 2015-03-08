'use strict';

// Processes string data for information.
function _parse(data, clusterMin, clusterMax, blacklist) {
  var urls = _getUrls(data),
    blacklist = blacklist || {},
    phrases = _getPhrases(data, clusterMin, clusterMax, blacklist);


  return {
    phrases: phrases,
    urls: urls
  };
}

// removes all html tags and lower cases the data.
function _stripHtmlTags(data) {
  return data.replace(/<[^>]*>/g, ' ').replace(/\s{2,}/g, ' ').replace(/[^0-9a-zA-Z]/, '').trim().toLowerCase();
}

// parses string data into logical phrases.
function _getPhrases(data, clusterMin, clusterMax, blacklist) {
  var stripped = _stripHtmlTags(data).split(' '),
    i = 0,
    j = 0,
    phrases = {},
    phrase;

  // Loop through the start phrases.
  for (i = 0; i < stripped.length + 1 - (clusterMax - clusterMin) ; i++) {
    phrase = '';

    // Loop through the cluster length from start.
    for (j = 0; j < clusterMax && i + j <= stripped.length; j++) {
      phrase += (j > 0 ? ' ' : '') + stripped[i + j];

      // Add phrase if not blacklisted and cluster is large enough.
      if (!blacklist[phrase] && j + 1 >= clusterMin) {
        if (phrases[phrase]) {
          phrases[phrase].qty++;
        } else {
          phrases[phrase] = {
            text: phrase,
            qty: 1
          };
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

module.exports.parse = _parse;
module.exports.html = _stripHtmlTags;