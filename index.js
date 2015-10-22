'use strict';
var ghParser = require('parse-github-url');
var isGhUrl = require('is-github-url');

var hasProtocol = function(string) {
  return /^(?:git(?!hub)|https?|git@).*github.com/.test(string);
};

// Replace all invalid protocols, slashes, hostnames to valid ones
var replacify = function(url, hostname) {
  return url.replace(
    /^(?:git|https?|git@)?(?:\:\/\/|:|\/\/)?github.com(\/|:)/,
    hostname
  );
};

var isNotNameRepoPair = function(string) {
  return /(?=github.com)(?:[\w\.-]+)\/(?:[\w\.-]+)/.test(string);
};

/**
 * getGithubUrl
 * Get a complete (or a canonical) GitHub repository URL (https or ssh)
 * from an incomplete URL or a user/repo path
 *
 * @name getGithubUrl
 * @function
 *
 * @param {String} input a URL or a user/repo path
 * @param {Object} options An object containing the following fields:
 *  - `protocol` {String}: A format of returned URL. Possible values: `ssh`
 * (https is used by default)
 *  - `cloning` {Boolean}: Make URL acceptable for `git clone` command
 * @return {String|Null} A valid GitHub URL or null
 */

module.exports = function getGithubUrl(input, options) {
  options = options || {};
  var isSsh = options.protocol === 'ssh' ? true : false;
  var hostname = isSsh ? 'git@github.com:' : 'https://github.com/';
  var gitDirectory = (isSsh || options.cloning) ? '.git' : '';

  if (typeof input !== 'string' || !input.length) {
    throw TypeError('URL must be a string');
  }

  if (!hasProtocol(input)) {
    input = replacify(input, hostname);
  }

  if (!isGhUrl(input, { repository: true }) && isNotNameRepoPair(input)) {
    return null;
  }

  var parsed = ghParser(input);

  if (!parsed.repopath) {
    return null;
  }

  return hostname + parsed.repopath + gitDirectory;
};
