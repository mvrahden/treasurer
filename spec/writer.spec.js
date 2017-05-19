let fs = require('fs');
let execSync = require('child_process').execSync;

let writer = require('../src/writer');

describe('Writer', function() {

  let content = {
    header: ['Col1','Col2','Col3','Col4'],
    data: [
      [11, '21', '31', '41'],
      ['12', 22, '32', '42'],
      ['13', '23', 33, '43'],
      ['14', '24', '34', 44]
    ]
  };

  let paths = [
    './test/subdir/subsubdir/test.json',
    './test/subdir/subsubdir/test.csv',
    './test/subdir/subsubdir/test.txt',
    'test/test.json',
    'test/test.csv',
    'test/test.txt'
  ]

  it('should be configured in the following order: header, data, path.', function() {
    paths.forEach((path) => {
      expect(() => {
        writer
        .setHeader(content.header)
        .setData(content.data)
        .writeTo(path)
      }).not.toThrow();
    });
  });

  it('shouldn\'t be configured in any deviating order from header, data, path.', function() {
    paths.forEach((path) => {
      expect(() => {
        writer
        .setData(content.data)
        .setHeader(content.header)
      }).toThrow();
    });
  });

  afterAll(() => {
    execSync('rm -rf ./test/');
  });

});