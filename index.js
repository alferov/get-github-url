'use strict';
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
  return /^github/.test(string);
};

var addProtocol = function(url) {
  return 'https://' + url;
};

module.exports = function getGithubUrl(options) {
  var url = options.url;
  var isSsh = options.protocol === 'ssh' ? true : false;
  var startOfLine = isSsh ? 'git@github.com:' : 'https://github.com/';
  var endOfLine = (isSsh || options.cloning) ? '.git' : '';

  if (typeof url !== 'string' || !url.length) {
    throw TypeError('URL must be a string');
  }

  if(isStartedWithoutProt(url)) {
    url = addProtocol(url);
  }

  var parsed = ghParser(url);

  return startOfLine + parsed.repopath + endOfLine;
};
