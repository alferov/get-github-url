# get-github-url

> Get full GitHub URL (https or ssh) based on incomplete URL or user/repo path

## Installation
```
$ npm install get-github-url --save
```

## Usage
```js
var getGithubUrl = require('get-github-url');

// HTTPS
getGithubUrl('facebook/react');
// => 'https://github.com/facebook/react'
getGithubUrl('github.com/facebook/react');
// => 'https://github.com/facebook/react'
getGithubUrl('git@github.com:facebook/react.git');
// => 'https://github.com/facebook/react'
getGithubUrl('//github.com/facebook/react.git');
// => 'https://github.com/facebook/react'

// SSH
getGithubUrl('facebook/react', { protocol: 'ssh' });
 // => 'git@github.com:facebook/react.git'
getGithubUrl('github.com/facebook/react', { protocol: 'ssh' });
 // => 'git@github.com:facebook/react.git'
getGithubUrl('git@github.com:facebook/react.git', { protocol: 'ssh' });
// => 'git@github.com:facebook/react.git'
getGithubUrl('//github.com/facebook/react.git', { protocol: 'ssh' });
// => 'git@github.com:facebook/react.git'

// Prepare URL for cloning:
getGithubUrl('facebook/react', { cloning: true });
// => 'https://github.com/facebook/react.git'
getGithubUrl('facebook/react', { cloning: true, ssh: true });
// => 'git@github.com:facebook/react.git'

```

## API
### `getGithubUrl(input, options)`
Get full GitHub URL (https or ssh) based on incomplete URL or user/repo path

#### Params
- **String** `input`: URL or user/repo path
- **Object** `options`: An object containing the following fields:
  - `protocol` (String): Set protocol type. Possible values: `ssh` (https is used by default)
  - `cloning` (Boolean): Make URL acceptable for `git clone` command

#### Return
- **String** | **Null**: Valid GitHub URL or null

## License
MIT © [Philipp Alferov](https://github.com/alferov)
