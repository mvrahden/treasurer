# Code - Example: Synced Reading

```typescript
import { Treasurer, ReaderConfig, DataSet } from 'treasurer';

// reading configuration Object
const config: ReaderConfig = { sync: true };

// path to the file as string
const path = 'path/to/dataset.csv';

// Read  --> could be encapsulated by try-catch-Block
const dataSet = Treasurer.fileReader(config).readFrom(path) as DataSet;
// @Typescript: Output can be safely asserted `as DataSet`

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
```