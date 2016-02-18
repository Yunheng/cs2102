var url = require('url');
var utils = {};

utils.getURLQuery = function(){
  return url.parse(window.location.href, true).query;

}



module.exports = utils;
