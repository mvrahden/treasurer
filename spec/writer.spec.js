let fs = require('fs');
let execSync = require('child_process').execSync;

const writer = require('../src/writer');

const validPaths = require('./testingData/validPaths');
const invalidPaths = require('./testingData/invalidPaths');
const validContents = require('./testingData/validFileContents');
const invalidContents = require('./testingData/invalidFileContents');

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

  it('should throw an error if given a false path.', () => {
    const someValidContent = validContents[0];
    invalidPaths.forEach((path)=> {
      expect(() => {
        Treasurer
          .setHeader(someValidContent.header)
          .setData(someValidContent.data)
          .writeTo(path);
      }).toThrow();
    });
  });

  it('should throw an error if given invalid contents.', () => {
    invalidContents.forEach((content) => {
      validPaths.forEach((path)=> {
        expect(() => {
          Treasurer
            .setHeader(content.header)
            .setData(content.data)
            .writeTo(path)
        }).toThrow();
      });
    });
  });

  afterAll(() => {
    cleanTestDirectory();
  });

});