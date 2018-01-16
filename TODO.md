# Todo
> Changelog and future features: Order is **bottom up**

# Future features
## version undefined
- other formats: *.dat, *.mat, *.sql(?)
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
  
# v1.5 unwanted datatype handling (config)
- config: unwanted Datatype handler
- test: all Datatypes available datatypes (check: https://dorey.github.io/JavaScript-Equality-Table/)
