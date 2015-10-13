'use strict';
var chai = require('chai');
var expect = chai.expect;
var getGithubUrl = require('../index.js');
var expected = 'https://github.com/facebook/react';
var expectedSsh = 'git@github.com:facebook/react.git';

describe('get-github-url', function() {
  it('should throw an error if url is not a string', function() {
    expect(getGithubUrl.bind(null, { url: {} }))
      .to.throw(/must be a string/);
  });

  it('should return valid https url', function() {
    expect(getGithubUrl({ url: 'facebook/react' }))
      .to.be.equal(expected);

    expect(getGithubUrl({ url: 'git@github.com:facebook/react.git' }))
      .to.be.equal(expected);

    expect(getGithubUrl({ url: 'github.com/facebook/react' }))
      .to.be.equal(expected);
  });

  it('should return valid ssh url', function() {
    expect(getGithubUrl({
      url: 'facebook/react',
      protocol: 'ssh'
    })).to.be.equal(expectedSsh);

    expect(getGithubUrl({
      url: expected,
      protocol: 'ssh'
    })).to.be.equal(expectedSsh);

    expect(getGithubUrl({
      url: 'git@github.com:facebook/react.git',
      protocol: 'ssh'
    })).to.be.equal(expectedSsh);

    expect(getGithubUrl({
      url: 'github.com/facebook/react',
      protocol: 'ssh'
    })).to.be.equal(expectedSsh);
  });
});
