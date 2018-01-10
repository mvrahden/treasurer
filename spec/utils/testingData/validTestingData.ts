import { DataSet } from '../../../dist/index';

export class Valid {
  public static headers = [
    ['validValue', 'validValue'],
    ['validValue', 1.555]
  ];
  public static paths: Array<string> = [
    './test/subdir/subsubdir/test.json',
    './test/subdir/subsubdir/test.csv',
    './test/subdir/subsubdir/test.tsv',
    './test/subdir/subsubdir/test.txt',
    'test/test.json',
    'test/test.csv',
    'test/test.tsv',
    'test/test.txt'
  ];
  public static fileContents: Array<DataSet> = [
    {
      header: ['Col1', 'Col2', 'Col3', 'Col4'],
      data: [
        [11, '21', '31', '41'],
        ['12', 22, '32', '42'],
        ['13', '23', 33, '43'],
        ['14', '24', '34', 44]
      ]
    },
    {
      header: ['Col1', 2, 3, 4],
      data: [
        [true, 0, 'abcde', '41'],
        [false, NaN, '', '42'],
        [0, undefined, 33, '43'],
        [1, null, '34', 44]
      ]
    }
  ];
  public static extensions: Array<{actual: string, expected: string}> = [
    { actual: './test.json', expected: 'json'},
    { actual: './utils/test.json', expected: 'json'},
    { actual: './utils/test.csv', expected: 'csv'},
    { actual: './utils/test.csv.tsv', expected: 'tsv'},
    { actual: './utils/test.csv.csv', expected: 'csv'},
    { actual: './utils/test.tsv.csv', expected: 'csv'},
    { actual: './utils/test.json.csv', expected: 'csv'},
    { actual: './utils/test.csv.json', expected: 'json'},
    { actual: './utils/test.csv.txt', expected: 'txt'},
  ];
  public static dataStructures: Array<Array<Array<string | number | boolean | [0] | {}>>> = [
    [['value', 'value']],
    [['value', 'value'], [1.23, 0]],
    [['value', 'value'], [1.555, NaN]],
    [['value', 'value'], [true, false]],
    [['value', 'value'], [{}, []]]
  ];
  public static dataElements = [
    [['value', 'value'], ['undefined', '']],
    [['value', 'value'], [1.23, 0]],
    [['value', 'value'], [1.555, NaN]],
    [['value', 'value'], [true, false]]
  ];
}
