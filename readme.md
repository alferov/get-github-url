# get-github-url

> Get full GitHub URL (https or ssh) based on passed arguments

## Install

```
$ npm install get-github-url --save
```

## Usage
```js
var getGithubUrl = require('get-github-url');
```

## API

### `getGithubUrl(input, options)`
Get full GitHub URL (https or ssh) based on passed arguments

#### Params
- **String** `input`: A string with partial url
- **Object** `options`: An object containing the following fields:
  - `protocol` (String): Protocol type. Possible values: `ssh`, `https`
  - `cloning` (Boolean): Make URL acceptable for `git clone` command

## License
MIT © [Philipp Alferov](https://github.com/alferov)
