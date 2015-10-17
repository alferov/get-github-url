'use strict';
var chai = require('chai');
var expect = chai.expect;
var getGithubUrl = require('../index.js');
var expected = 'https://github.com/facebook/react';
var expectedSsh = 'git@github.com:facebook/react.git';
var expectedCloning = 'https://github.com/facebook/react.git';
var urls = [
  'facebook/react',
  'git@github.com:facebook/react.git',
  'github.com/facebook/react',
  'https://github.com/facebook/react.git',
  '//github.com/facebook/react.git',
  ':github.com/facebook/react.git'
];
var invalidUrls = [
  'google.ca',
  'facebook.github.io',
  'github.com/facebook'
];
var options;


describe('get-github-url', function() {
  describe('error handling', function() {
    it('should throw an error if url is not a string', function() {
      expect(getGithubUrl.bind(null, {}))
        .to.throw(/must be a string/);
    });
  });

  describe('with a standart set of options', function() {
    urls.forEach(function(url) {
      it('URL' + ' - ' + url + ' should be valid', function () {
        expect(getGithubUrl(url)).to.be.equal(expected);
      });
    });

    invalidUrls.forEach(function(url) {
      it('URL' + ' - ' + url + ' should be invalid', function () {
        expect(getGithubUrl(url)).to.be.null;
      });
    });
  });

  describe('with cloning option enabled', function() {
    before(function() {
      options = { cloning: true };
    });

    urls.forEach(function(url) {
      it('URL' + ' - ' + url + ' should be valid', function () {
        expect(getGithubUrl(url, options)).to.be.equal(expectedCloning);
      });
    });
  });

  describe('with protocol option equals to ssh', function() {
    before(function() {
      options = { protocol: 'ssh' };
    });

    urls.forEach(function(url) {
      it('URL' + ' - ' + url + ' should be valid', function () {
        expect(getGithubUrl(url, options)).to.be.equal(expectedSsh);
      });
    });
  });

  describe('with protocol option equals to ssh and cloning enabled', function() {
    before(function() {
      options = { protocol: 'ssh', cloning: true };
    });

    urls.forEach(function(url) {
      it('URL' + ' - ' + url + ' should be valid', function () {
        expect(getGithubUrl(url, options)).to.be.equal(expectedSsh);
      });
    });
  });
});
