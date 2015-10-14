'use strict';
var ghParser = require('parse-github-url');
/**
 * getGithubUrl
 *
 * @name getGithubUrl
 * @function
 * @return
 */

// There is an issue of parse-github-url: if url starts without protocol, it's
// considered as a git username
var isStartedWithoutProt = function(string) {
  return /^github.com\//.test(string);
};

var addProtocol = function(url, protocol) {
  return url.replace(/^github.com\//, protocol);
};

module.exports = function getGithubUrl(url, options) {
  options = options || {};
  var isSsh = options.protocol === 'ssh' ? true : false;
  var startOfLine = isSsh ? 'git@github.com:' : 'https://github.com/';
  var endOfLine = (isSsh || options.cloning) ? '.git' : '';

  if (typeof url !== 'string' || !url.length) {
    throw TypeError('URL must be a string');
  }

  if(isStartedWithoutProt(url)) {
    url = addProtocol(url, startOfLine);
  }

  var parsed = ghParser(url);

  return startOfLine + parsed.repopath + endOfLine;
};
