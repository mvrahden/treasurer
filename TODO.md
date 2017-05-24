# Todo
## v0.6
- ~~write *.json and *.csv~~
- ~~missing Test for `validPath`~~
- ~~Change from setPath(path).write() to writeTo(path)~~
- ~~Change from setPath(path).read() to readFrom(path)~~

## v0.8
- ~~read *.json, *.csv and *.txt (as csv)~~
- ~~testing travis integration~~~

## v0.9
- ~~more complex sample data for testing~~
- ~~refactoring/ cleaning code~~
- ~~documentation~~
- ~~Finish Treasurer integration test: Reconstruction of clean written structure via (de-)escaping values~~
  - ~~(de-)escape Strings with delimiting quotes~~
  - ~~JSON.stringify and JSON.parse (de-)escape `NaN`~~
- ~~adding test suite for "reader"?~~

## v1.0a
- first release candidate
- Typescript Definition File

## future features
- dynamic `Array<Object>` parsing
  - [{id: 1, name: 'someName', key: 'someValue', ...},{id: 2, name: 'someOtherName', key: 'otherValue', ...},{id: 3, name: 'someOtherName', key: 'otherValue', ...}]
  - to known format
- dynamic transformation of data into the needed form
  - Treasurer here (Schema?) is my header located --> turn into valid header array
  - Treasurer here (Schema?) is my data located --> turn into valid data array
- other formats: *.dat, *.mat, *.sql(?)
- adding codecoverage