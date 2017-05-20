let fs = require('fs');
let execSync = require('child_process').execSync;

const writer = require('../src/writer');

const validPaths = require('./testingData/validPaths');
const validContents = require('./testingData/validFileContents');

const cleanTestDirectory = function() {
  execSync('rm -rf ./test/');
};

describe('Writer', () => {

  const someValidContent = validContents[1];

  it('shouldn\'t be configured in any deviating order from header, data, path.', () => {
    validPaths.forEach((path) => {
      expect(() => {
        writer
        .setData(someValidContent.data)
        .setHeader(someValidContent.header);
      }).toThrow();
    });
  });

  it('should be configured in the following order: header, data, path.', () => {
    validPaths.forEach((path) => {
      expect(() => {
        writer
        .setHeader(someValidContent.header)
        .setData(someValidContent.data)
        .writeTo(path);
      }).not.toThrow();
    });
  });

  afterAll(() => {
    cleanTestDirectory();
  });

});