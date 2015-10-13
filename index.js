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

// There is an issue of parse-github-url: if url starts with "github", it's
// considered as git username
var isStartedWithoutProt = function(string) {
  var pattern = /^github/;
  return pattern.test(string);
};

var addProtocol = function(url) {
  return 'https://' + url;
};

module.exports = function getGithubUrl(options) {
  var url = options.url;
  var startLine = options.protocol === 'ssh' ? 'git@github.com' : 'https://github.com/';

  if (!isString(url)) {
    throw TypeError('URL must be a string');
  }

  if(isStartedWithoutProt(url)) {
    url = addProtocol(url);
  }

  var parsed = ghParser(url);

  return startLine + parsed.repopath;
};
