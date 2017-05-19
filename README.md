> A lightweight tool to read and write *feature-sets* (2D data) as *.json, *.csv or txt.

[![Build](https://travis-ci.org/mvrahden/treasury.svg?branch=master)](https://travis-ci.org/mvrahden/treasury)
[![codecov.io](https://codecov.io/github/mvrahden/treasury/coverage.svg?branch=master)](https://codecov.io/github/mvrahden/treasury?branch=master)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

# Install
Install it using the following command or the build script:
```
npm install treasury
```

# Usage

Read data from file and always get the data in the same strucute:
```
let Treasury = require('treasury');

let content = Treasury.readFrom('./path/to/file.csv');
// csv, json or txt (as 2D dataset) accepted

console.log(content.header);
  // --> 1D Array of Strings and/or Numbers
console.log(content.data);
  // --> 2D Array of Strings, Numbers and/or Boolean
```

Write data to any given file:
```
let Treasury = require('treasury');

//... prepare a header and data

Treasury.
  .setHeader(header)  // 1D Array of Strings and/or Numbers
  .setData(data)      // 2D Array of Strings and/or Numbers
  .writeTo('./path/to/file.csv'); // csv, json or txt accepted
```

# API
## Treasury