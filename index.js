'use strict';
var isString = require('is-string');

/**
 * getGithubUrl
 *
 * @name getGithubUrl
 * @function
 * @return
 */

module.exports = function getGithubUrl(options) {
  var url = options.url;
  var protocol = options.protocol;

  if (!isString(url)) {
    throw TypeError('URL must be a string');
  }
  
};
