'use strict';
var chai = require('chai');
var expect = chai.expect;
var getGithubUrl = require('../index.js');
var expected = 'https://github.com/facebook/react';

describe('get-github-url', function() {
  it('should throw an error if url is not a string', function() {
    expect(getGithubUrl.bind(null, { url: {} }))
      .to.throw(/must be a string/);
  });

  it('should get valid https url', function() {
    expect(getGithubUrl({ url: 'facebook/react' }))
      .to.be.equal(expected);

    expect(getGithubUrl({ url: 'git@github.com:facebook/react.git' }))
      .to.be.equal(expected);

  });
});
