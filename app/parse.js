'use strict';

function _parse(data, clusterMin, clusterMax) {
  var stripped = _stripHtmlTags(data).split(' '),
  rtnObj = {},
  i = 0,
  j = 0,
  phrase;

  for (i = 0; i < stripped.length + 1 - (clusterMax - clusterMin) ; i++) {
    phrase = '';

    for (j = 0; j < clusterMax && i + j <= stripped.length; j++) {
      phrase += (j > 0 ? ' ' : '') + stripped[i + j];

      if (j + 1 >= clusterMin) {
        if (rtnObj[phrase]) {
          rtnObj[phrase].qty++;
        } else {
          rtnObj[phrase] = {
            text: phrase,
            qty: 1
          }
        }
      }
    }
  }

  return rtnObj;
}

function _stripHtmlTags(data) {
  return data.replace(/<[^>]*>/g, ' ').replace(/\s{2,}/g, ' ').trim().toLowerCase();
}

exports.parse = _parse;
exports.html = _stripHtmlTags;