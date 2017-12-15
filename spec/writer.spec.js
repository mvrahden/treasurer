'use strict';
const _DIR_ = '../dist';

let execSync = require('child_process').execSync;

const FileWriter = require(_DIR_+'/writer').FileWriter;

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
        new FileWriter()
          .setData(someValidContent.data)
          .setHeader(someValidContent.header);
      }).toThrowError(/function/);
    });
  });

  it('should be configured in the following order: header, data, path.', () => {
    validPaths.forEach((path) => {
      expect(() => {
        new FileWriter()
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
        new FileWriter()
          .setHeader(someValidContent.header)
          .setData(someValidContent.data)
          .writeTo(path);
      }).toThrowError(/path/);
    });
  });

  it('should throw an error if given invalid contents.', () => {
    invalidContents.forEach((content) => {
      validPaths.forEach((path)=> {
        expect(() => {
          new FileWriter()
            .setHeader(content.header)
            .setData(content.data)
            .writeTo(path);
        }).toThrowError(/(setHeader|setData)/);
      });
    });
  });

  afterAll(() => {
    cleanTestDirectory();
  });
});
