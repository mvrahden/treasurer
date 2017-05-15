let fs = require('fs');
let exec = require('child_process').exec;

let Treasury = require('../index');

describe('Treasury', () => {
  
  let content = {
    header: ['Col1','Col2','Col3','Col4'],
    data: [
      [11, '21', '31', '41'],
      ['12', 22, '32', '42'],
      ['13', '23', 33, '43'],
      ['14', '24', '34', 44]
    ]
  };

  let falsePaths = [
    [],
    null,
    undefined,
    1.5,
    './test/subdir/subsubdir/test.xlsx',
    './test/subdir/subsubdir/test',
    './test/subdir/subsubdir/test.doc'
  ];

  let paths = [
    './test/subdir/subsubdir/test.json',
    './test/subdir/subsubdir/test.csv',
    './test/subdir/subsubdir/test.txt',
    'test/test.json',
    'test/test.csv',
    'test/test.txt'
  ]

  it('should throw an error if given false path. (Valid for Reader & Writer)', function() {
    falsePaths.forEach((path)=> {
      expect(() => {
        Treasury.writer
        .setHeader(content.header)
        .setData(content.data)
        .setPath(path);
      }).toThrow();
      expect(() => {
        Treasury.reader
        .setPath(path);
      }).toThrow();
    });
  });

  it('should create the file even in deeply nested, non-existing directories.', function() {
    paths.forEach((path)=> {
      expect(() => {
        Treasury.writer
        .setHeader(content.header)
        .setData(content.data)
        .setPath(path)
        .write()
      }).not.toThrowError();
      expect(fs.existsSync(path)).toBe(true);
    });
  });

  it('should be able to read the files content.', function() {
    paths.forEach((path)=> {
      expect(fs.existsSync(path)).toBe(true);
      expect(Treasury.reader.setPath(path).read()).toEqual(Object);
    });
  });

  afterAll(() => {
    exec('rm -rf test/');
  });
});