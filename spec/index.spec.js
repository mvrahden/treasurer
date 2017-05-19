let fs = require('fs');
let execSync = require('child_process').execSync;

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

  describe('Writer', () => {
    it('should throw an error if given a false path.', function() {
      falsePaths.forEach((path)=> {
        expect(() => {
          Treasury
            .setHeader(content.header)
            .setData(content.data)
            .writeTo(path);
        }).toThrow();
      });
    });

    it('should create the file even in deeply nested, non-existing directories.', function() {
      paths.forEach((path)=> {
        expect(() => {
          Treasury
            .setHeader(content.header)
            .setData(content.data)
            .writeTo(path)
        }).not.toThrowError();
        expect(fs.existsSync(path)).toBe(true);
      });
    });
  });

  describe('Reader', () => {
    it('should throw an error if given a false path.', function() {
      falsePaths.forEach((path)=> {
        expect(() => {
          Treasury.readFrom(path);
        }).toThrow();
      });
    });

    it('should be able to read the files content.', function() {
      paths.forEach((path)=> {
        expect(fs.existsSync(path)).toBe(true);
        expect(Treasury.readFrom(path)).toBeTruthy(content);
      });
    });
  });

  afterAll(() => {
    execSync('rm -rf ./test/');
  });

});