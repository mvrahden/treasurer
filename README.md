# Treasurer
[![Build Status](https://travis-ci.org/mvrahden/treasurer.svg?branch=master)](https://travis-ci.org/mvrahden/treasurer) [![Build status](https://ci.appveyor.com/api/projects/status/1gbi2lkll4d48cy6/branch/master?svg=true)](https://ci.appveyor.com/project/mvrahden/treasurer/branch/master) [![dependency-free](https://img.shields.io/badge/dependencies-none-brightgreen.svg)]() [![js-google-style](https://img.shields.io/badge/code%20style-google-blue.svg)](https://google.github.io/styleguide/jsguide.html)

[sync-write]: examples/synced-writing.md
[async-write]: examples/async-writing.md
[sync-read]: examples/synced-reading.md
[async-read]: examples/async-reading.md

> A lightweight tool to read and write 2-dimensional data to common file formats, e.g. *.json, *.csv or *.tsv.

* [API-Description](#api-description)
  * [Writer](#write)
  * [Reader](#read)
* Code-Examples
  * [How to write data sets?](#how-to-write) + More Examples: [Sync][sync-write] / [Async][async-write]
  * [How to read data sets?](#how-to-read) + More Examples: [Sync][sync-read] / [Async][async-read]

## For Production Use

Version | Change
--- | --- 
**v. 1.4.4** | Downward compatibility fix for NodeJS Versions < 8.0 and<br>extended CI-Testing for NodeJS Versions >=6.0.0.
**v. 1.4.8** | Introduce OS-independent paths.
**v. 1.4.11** | Introduce Windows CI-Testing.
**v. 1.4.15** | Refactoring; resolve-reject injection checks; async error handling

### How to install as dependency

Download available `@npm`: [treasurer](https://www.npmjs.com/package/treasurer)

Install via command line:
```
npm install --save treasurer
```

### How To use this Library in Production

Currently exposed Classes and Interfaces:

* **Treasurer** - Contains reading and writing facilities.
* **DataSet** - Interface representing the dataset structure.
* **ReaderConfig, WriterConfig** - Interfaces representing the Reading/Writing configuration structure.

These classes can be imported from this `npm` module, e.g.:
```typescript
import { Treasurer } from 'treasurer';
```

For JavaScript usage `require` classes from this `npm` module as follows:
```javascript
let Treasurer = require('treasurer').Treasurer;
```

**Write data** <a name="how-to-write"></a> synchronously to any given file path:<br>
(For async writing please check the [code example][async-write].)

```typescript
import { Treasurer } from 'treasurer';

//... prepare a header and data, e.g.
let header = ['id', 'name', 'date of birth', 'nationality', 'rat pack member'];
let data = [
            [1, 'Frank Sinatra', '12-12-1915', 'US', true],
            [2, 'Dean Martin', '07-07-1917', 'US', true],
            [3, 'Sammy Davis Jr.', '12-08-1925', 'US', true],
            [4, 'Freddie Prinze Jr.', '03-08-1976', 'US', false],
            //...
            ];

//... optionally: prepare the configuration
const config = { sync: true, fileSystem: { encoding: 'utf8' } };

Treasurer
  .fileWriter(config)   // configures the writing facilities
  .setHeader(header)  // 1D Array of Strings and/or Numbers
  .setData(data)      // 2D Array of Strings, Numbers and/or Boolean
  .writeTo('./path/to/file.csv'); // csv, tsv, json or txt accepted
```

**Read data** <a name="how-to-read"></a> synchronously from files and always receive the data in the same structured format:<br>
(For async reading please check the [code example][async-read].)

```typescript
import { Treasurer } from 'treasurer';

//... optionally: prepare the configuration
const config = { sync: true, fileSystem: { encoding: 'utf8' } };

let dataset = Treasurer
                .fileReader(config)
                .readFrom('./path/to/file.csv'); // csv, tsv, json or txt accepted

console.log(dataset.header);
  // --> 1D Array of Strings and/or Numbers
  // ['id', 'name', 'date of birth', 'nationality', 'rat pack member']

console.log(dataset.data);
  // --> 2D Array of Strings, Numbers and/or Boolean
  // [
  //  [1, 'Frank Sinatra', '12-12-1915', 'US', true],
  //  [2, 'Dean Martin', '07-07-1917', 'US', true],
  //  [3, 'Sammy Davis Jr.', '12-08-1925', 'US', true],
  //  [4, 'Freddie Prinze Jr.', '03-08-1976', 'US', false],
  //  ...
  // ];
```

## API-Description

### Write

In the following section is the API description for the writing facility.<br>
Also have a look at the **Code Examples** for:
* [async writing][async-write] and
* [sync writing][sync-write].

#### `fileWriter(options?: WriterConfig): Function`
* Entry point and configuration-injection for the file-writer facility.
* `options?: WriterConfig` - optional writer configuration. Structure as follows:
  * `sync?: boolean` - synchronous writing. [Default: `false`]
  * `fileSystem?: object|string|null` - set Filesystem related options
    * `encoding?: string|null` - Default: `'utf8'`
    * `mode?: number|string` - Default: `0o666`
    * `flag?: string` - Default: `'w'`
* returns `setHeader: Function`

#### `setHeader(header: Array<string|number>): Function`
* `header`: 1D-Array of Column Names
  * Valid data types: `string` and `number`
* returns `setData: Function`
* throws an `Error` if input doesn't meet the expected scope

#### `setData(data: Array<Array<string|number|boolean>>): Function`
* `data`: 2D-Array of mixed values
  * each row represents one data set
  * Valid data types:
    * Booleans (`true`, `false`),
    * Strings (`'abc'`, `''`) and
    * Numbers (`1`, `1.234`, `NaN`)
    * `undefined`, `null` are being translated to `''` (empty String)
* returns `writeTo: Function`
* throws an `Error` if input doesn't meet the expected scope, e.g. nested structures like `Objects`, `Arrays`

#### `writeTo(path: string, resolve?: (value?: void | PromiseLike<void>) => void, reject?: (reason?: any) => void): void | Promise<void>`
* Accepts an **OS-independent** path value and writes the data to the output-file. 
* Non-existing directories will auto-magically be created.
* `path`: analogue to `readFrom()`
* `resolve?`: optional `resolve` function for ASYNC writing tasks
* `reject?`: optional `reject` function for ASYNC writing tasks
* returns `void` in synchronous call and `Promise<void>` in async function call.
* throws an `Error` if
  * input doesn't meet the expected scope or
  * if the writing process was aborted.

### Read

In the following section is the API description for the reading facility.<br>
Also have a look at the **Code Examples** for:
* [async reading][async-read] and
* [sync reading][sync-read].

#### `fileReader(options?: ReaderConfig): Function`
* Entry point and configuration-injection for the file-reader facility.
* `options?`: optional reader configuration. Structure as follows:
  * `sync?: boolean` - synchronous reading. [Default: `false`]
  * `fileSystem?: object|string|null` - set Filesystem related options
    * `encoding?: string|null` - Default: `'utf8'` (differing from NodeJS Default)
    * `flag?: string` - Default: `'r'`
* returns `readFrom: Function`

#### `readFrom(path: string, resolve?: (value?: DataSet | PromiseLike<DataSet>) => void, reject?: (reason?: any) => void): DataSet | Promise<DataSet>`
* Accepts an **OS-independent** path value and reads the content from that file. 
* `path`: String containing the path to the file; independent of the Operating System; e.g.:
  * relative Posix Path: `path/to/file.json` or `./path/to/file.json`
  * absolute Posix Path: `/path/to/file.csv`
  * relative Windows Path: `path\to\file.json` or `.\path\to\file.json`
  * absolute Windows Server-Path: `C:\path\to\file.csv` or `\\path\to\file.csv` (mind: escaping characters!)
* `resolve?`: optional custom `resolve` function for ASYNC reading tasks
* `reject?`: optional custom `reject` function for ASYNC reading tasks
* returns `DataSet` in synchronous call and a `Promise<DataSet>` in async function calls. `DataSet` containing the following structure:
  * `header: Array<string|number>` - 1D-Array of mixed values.
  * `data: Array<Array<string|number|boolean>>` - 2D-Array of corresponding data mixed values.
* throws an `Error` if input doesn't meet the expected scope.

### Error-handling

* **sync-mode**: Each method is able to throw an `Error`. The triggered `Error`-object contains a hint regarding the occured problem.
* **async-mode**: Each occuring `Error` is populated into the `reject`-callback and the progress of writing is thus cancelled. If no `reject`-callback given, the `Error` is thrown and can be catched with the `catch`-facility of the resulting Promise. The triggered `Error` contains a hint regarding the occured problem.

## Scope Definition

This project is meant to be *lightweight*, *easy to use* and limited to the initial scope of:
* trouble-free reading and persisting of 2D data sets in any common format.

#### Limitations

Treasurer is bound to the permissions of your operating system. It is always assuming that you have the specific permissions to read and write data or create directories and will throw an Error if you don't.

#### Quality Measures

This project is configured to run automated tests via *Travis CI* (for Linux and MacOS) and *AppVeyor* (for Windows x86/x64).

> The project is explicitly tested against **NodeJS Versions > 6.0.0**.

#### Dependencies

* **util.promisify** - Polyfill for NodeJS Versions < 8.0

## Community Contribution

Everybody is more than welcome to contribute and extend the functionality!

Please feel free to contribute to this project as much as you wish to.

1. clone from GitHub via `git clone https://github.com/mvrahden/treasurer.git`
2. `cd` into the directory and `npm install` for initialization
3. Try to `npm run test`. If everything is green, you're ready to go :sunglasses:

Before triggering a pull-request, please make sure that you've run all the tests via the *testing command*:

```
npm run test
```

## Code of Conduct

When you're contributing, try to...

- make things clear to everyone.
- encapsulate complex things in methods with expressive names.
- not hide any relevant information for other colleagues.
- never use comments when you can express things through code - so: never use comments.
- keep methods small and simple for interpretion.
- leave places always a bit cleaner than you've found them.

# License

This Project is licensed under the [BSD-3-Clause](LICENSE).
