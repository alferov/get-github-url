'use strict';
var ghParser = require('parse-github-url');
var isGhUrl = require('is-github-url');

var hasProtocol = function(string) {
  return /^\.*\//.test(string);
};

var addProtocol = function(url, protocol) {
  return url.replace(/^(?:git|https?|git@)?(?:\:\/\/)?github.com(\/|:)/, protocol);
};

var isUsernameRepoPair = function(string) {
  return /(?:[\w\.-]+)\/(?:[\w\.-]+)/.test(string);
};

/**
 * getGithubUrl
 * Get full GitHub URL (https or ssh) based on passed arguments
 *
 * @name getGithubUrl
 * @function
 *
 * @param {String} input A string to be validated
 * @param {Object} options An object containing the following fields:
 *  - `includeGhPages` (Boolean): Add github.io domain to
 * the matching pattern
 *
 * @return
 */

module.exports = function getGithubUrl(input, options) {
  options = options || {};
  var isSsh = options.protocol === 'ssh' ? true : false;
  var startOfLine = isSsh ? 'git@github.com:' : 'https://github.com/';
  var endOfLine = (isSsh || options.cloning) ? '.git' : '';

  if (typeof input !== 'string' || !input.length) {
    throw TypeError('URL must be a string');
  }

  if (!isGhUrl(input) && !isUsernameRepoPair(input)) {
    return null;
  }

  if (!hasProtocol(input)) {
    input = addProtocol(input, startOfLine);
  }

  var parsed = ghParser(input);

  return startOfLine + parsed.repopath + endOfLine;
};
