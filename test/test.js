'use strict';
var chai = require('chai');
var expect = chai.expect;
var getGithubUrl = require('../index.js');
var current, expected;

describe('get-github-url', function() {
  it('should throw an error if url is not a string', function() {
    expect(getGithubUrl.bind(null, { url: {} }))
      .to.throw(/must be a string/);
  });
});
