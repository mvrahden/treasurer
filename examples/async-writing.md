# Code - Example: Async Writing

```typescript
import { Treasurer, WriterConfig, DataSet } from 'treasurer';

// writing configuration Object
const config: WriterConfig = { sync: false };

// prepare the dataset
const dataset: DataSet = { header: null, data: null };

// populate the dataset
dataset.header = ['id', 'name', 'date of birth', 'nation', 'rat pack member'];
dataset.data = [
  [1, 'Frank Sinatra', '12-12-1915', 'US', true],
  [2, 'Dean Martin', '07-07-1917', 'US', true],
  [3, 'Sammy Davis Jr.', '12-08-1925', 'US', true],
  [4, 'Freddie Prinze Jr.', '03-08-1976', 'US', false],
  //...
];

// path to the file as string
const path = 'path/to/dataset.csv';

// custom resolve function
const resolve = () => { /* feel free to do stuff here... */ };

// custom reject function
const reject = (err: Error) => { /* feel free to do stuff here... */ };

// inject resolve and reject function to receive the results
Treasurer
  .fileWriter(config)
  .setHeader(dataset.header)
  .setData(dataset.data)
  .writeTo(path, resolve, reject);

```
