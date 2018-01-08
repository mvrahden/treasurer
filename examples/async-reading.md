# Code - Example: Async Reading

```typescript
import { Treasurer, ReaderConfig, DataSet } from 'treasurer';

// reading configuration Object
const config: ReaderConfig = { sync: false };

// path to the file as string
const path = 'path/to/dataset.csv';

// custom resolve function
const resolve = (dataSet: DataSet) => {
  console.log(dataSet.header);
  // --> 1D Array of Strings and/or Numbers
  // ['id', 'name', 'date of birth', 'nation', 'rat pack member']

  console.log(dataSet.data);
  // --> 2D Array of Strings, Numbers and/or Boolean
  // [
  //  [1, 'Frank Sinatra', '12-12-1915', 'US', true],
  //  [2, 'Dean Martin', '07-07-1917', 'US', true],
  //  [3, 'Sammy Davis Jr.', '12-08-1925', 'US', true],
  //  [4, 'Freddie Prinze Jr.', '03-08-1976', 'US', false],
  //  ...
  // ];
};

// custom reject function
const reject = (err: Error) => { /* feel free to do stuff here... */ };

// inject resolve and reject function to receive the results
Treasurer.fileReader(config).readFrom(path, resolve, reject);
```
