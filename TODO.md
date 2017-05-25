# Todo
> Changelog and future features: Order is **bottom up**

# Known Issues
- solved: ~~relative file path referring to current directory ('./filename.ext' | 'filename.ext') leads to ENOENT-Error~~

# Future features
## version undefined
- other formats: *.dat, *.mat, *.sql(?)
- adding codecoverage
- add test for relative path issue

## v3.0
- dynamic agregation of data into the needed form
  - Treasurer here (Schema?) is my header located --> turn into valid header array
  - Treasurer here (Schema?) is my data located --> turn into valid data array

## v2.0
- transform(...).
  - toObjectOfRowArray() # { header:[...], data:[ [...], [...], ... ] }
    - header names seperated from data
  - toObjectOfColumnArray() # { header:[...], data:[ [...], [...], ... ] }
    - header names seperated from data
  - toArrayOfRowObjects() # [ {col1: ..., col2: ...}, {col1: ..., col2: ...}, ... ]
    - attributes of row objects: header names
  - toObjectOfColumnArrays() # { col1: [ ... ], col2: [ ... ], ... }
    - attributes: header names
  - toArrayOfColumnArrays() # [ [...], [...], ... ]
    - first cells: header names
  - toArrayOfRowArrays() # [ [...], [...], ... ]
    - first row: header names
- readFrom(...).
  - UNCERTAIN: asObjectOfRowArrays() # { header:[...], data:[ [...], [...], ... ] }
  - UNCERTAIN: asObjectOfColumnArrays() # { col1: [ ... ], col2: [ ... ], ... }
  - UNCERTAIN: asArrayOfRowObjects() # [ {col1: ..., col2: ...}, {col1: ..., col2: ...}, ... ]
  - UNCERTAIN: asArrayOfColumnArrays() # [ [...], [...], ... ]
  - UNCERTAIN: asArrayOfRowArrays() # [ [...], [...], ... ]

## v1.2
- async read
  - inject callback
- async write
  - inject callback

## v1.1
- ~~only delimit those string values that contain spaces | are delimited with quotes | or numbers formatted Strings~~

## v1.0a
- ~~first release candidate~~
- ~~Typescript Definition File~~

## v0.9
- ~~more complex sample data for testing~~
- ~~refactoring/ cleaning code~~
- ~~documentation~~
- ~~Finish Treasurer integration test: Reconstruction of clean written structure via (de-)escaping values~~
  - ~~(de-)escape Strings with delimiting quotes~~
  - ~~JSON.stringify and JSON.parse (de-)escape `NaN`~~
- ~~adding test suite for "reader"?~~

## v0.8
- ~~read *.json, *.csv and *.txt (as csv)~~
- ~~testing travis integration~~~

## v0.6
- ~~write *.json and *.csv~~
- ~~missing Test for `validPath`~~
- ~~Change from setPath(path).write() to writeTo(path)~~
- ~~Change from setPath(path).read() to readFrom(path)~~
