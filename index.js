'use strict';
var isString = require('is-string');
var ghParser = require('parse-github-url');
/**
 * getGithubUrl
 *
 * @name getGithubUrl
 * @function
 * @return
 */

module.exports = function getGithubUrl(options) {
  var url = options.url;
  var startLine = options.protocol === 'ssh' ? 'git@github.com' : 'https://github.com/';

  if (!isString(url)) {
    throw TypeError('URL must be a string');
  }

  var parsed = ghParser(url);

  return startLine + parsed.repopath;
};
