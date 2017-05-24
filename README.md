# Treasurer [![Build Status](https://travis-ci.com/mvrahden/treasurer.svg?token=nMzrxR4ZGjjBxBvNfUdC&branch=master)](https://travis-ci.com/mvrahden/treasurer) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

> A dependency-free tool to read and write *feature-sets* (2D data) as *.json, *.csv or *.txt.

# Install
Install it using the following command:
```
npm install treasurer
```

# Usage

Read data from file and always get the data in the same strucute:
```javascript
let Treasurer = require('treasurer');

let content = Treasurer.readFrom('./path/to/file.csv');
// csv, json or txt (as 2D dataset) accepted

console.log(content.header);
  // --> 1D Array of Strings and/or Numbers
console.log(content.data);
  // --> 2D Array of Strings, Numbers and/or Boolean
```

Write data to any given file:
```javascript
let Treasurer = require('treasurer');

//... prepare a header and data

Treasurer.
  .setHeader(header)  // 1D Array of Strings and/or Numbers
  .setData(data)      // 2D Array of Strings and/or Numbers
  .writeTo('./path/to/file.csv'); // csv, json or txt accepted
```

# API

> Each method throws a String containing a message in case of false usage.

## Read
#### Method: `readFrom(path: String): Object`
- `path`: String containing the path to the file; e.g.:
  - relative Posix Path: `path/to/file.json`
  - absolute Posix Path: `/path/to/file.csv`
  - relative Windows Path: `path\\to\\file.json` (not yet tested)
  - absolute Windows Path: `C:\\path\\to\\file.csv` (not yet tested)
- returns an `Object` containing:
  - `header`: 1D-Array of mixed values.
  - `data`: 2D-Array of corresponding data mixed values.
- throws a message if input doesn't meet the accepted scope

## Write
#### Method: `setHeader(header[]: Array<String>): Function`
- `header`: 1D-Array of Column Names
  - Valid data types: Strings and Numbers
- returns `setData: Function`
- throws a message if input doesn't meet the accepted scope

#### Method: `setData(data[][]: Array): Function`
- `data`: 2D-Array of mixed values
  - each row represents one data set
  - Valid data types:
    - Booleans (`true`, `false`),
    - Strings (`'abc'`, `''`) and
    - Numbers (`1`, `1.234`, `NaN`)
    - `undefined`, `null` are being translated to `''` (empty String)
- returns `writeTo: Function` (represented by `writeTo`)
- throws a message if
  - input doesn't meet the accepted scope, e.g. nested structures like `Objects`, `Arrays`

#### Method: `writeTo(path: String): void`
- `path`: String containing the path to the output-file; e.g.:
  - relative Posix Path: `path/to/file.json`
  - absolute Posix Path: `/path/to/file.csv`
  - relative Windows Path: `path\\to\\file.json` (not yet tested)
  - absolute Windows Path: `C:\\path\\to\\file.csv` (not yet tested)
- sets the path and writes the data to the output-file
  - for the sake of usability, this methods violates the Single Responsibility Principle
- throws a message if
  - input doesn't meet the accepted scope or
  - if the writing process was aborted.

# Scope Definition
This project is meant to be *lightweight*, *easy to use* and limited to the initial scope of:
> reading and persisting 2D-DataSets in any common format.

# Community Contribution
> Everybody is more than welcome to contribute!

Please feel free to contribute to this project as much as you wish to. Before triggering a pull-request, please make sure that you've run all the tests via the *testing command*:
```
npm test
```

# Coding Code
When you're coding, try to...
- make things clear to everyone.
- encapsulate complex things in methods with expressive names.
- not hide any relevant information for other colleagues.
- never use comments when you can express things through code - so: never use comments.
- keep methods small and simple to interpret.
- leave places always a bit cleaner than you've found them.