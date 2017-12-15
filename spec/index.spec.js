'use strict';
const _DIR_ = '../dist';

const Treasurer = require(_DIR_+'/index').Treasurer;
const FileValidator = require(_DIR_+'/utils/file-validator').FileValidator;

const fs = require('fs');
const execSync = require('child_process').execSync;
const _ = require('lodash');

const validPaths = require('./testingData/validPaths');
const validContents = require('./testingData/validFileContents');

const cleanTestDirectory = function() {
  execSync('rm -rf ./test/');
};

const writeAnyValidData = function(content, path) {
  Treasurer
    .fileWriter()
    .setHeader(content.header)
    .setData(content.data)
    .writeTo(path);
};

describe('Treasurer:', () => {
  describe('Writer', () => {
    beforeEach(() => {
      cleanTestDirectory();
    });

    it('should create the file even in deeply nested, non-existing directories.', () => {
      validContents.forEach((content) => {
        validPaths.forEach((path)=> {
          expect(() => {
            Treasurer
              .fileWriter()
              .setHeader(content.header)
              .setData(content.data)
              .writeTo(path);
          }).not.toThrowError();
          expect(fs.existsSync(path)).toBe(true);
        });
      });
    });

    afterAll(() => {
      cleanTestDirectory();
    });
  });

  describe('Reader', () => {
    beforeAll(() => {
      let content = validContents[0];
      validPaths.forEach((path)=> {
        writeAnyValidData(content, path);
      });
    });

    it('should be able to read the files content.', () => {
      validContents.forEach((content) => {
        validPaths.forEach((path)=> {
          expect(fs.existsSync(path)).toBe(true);
          expect(() => {
            Treasurer
              .fileReader()
              .readFrom(path);
          }).not.toThrow();
        });
      });
    });
  });

  describe('Treasurer', () => {
    it('should be able to reconstruct the (cleaned) data that was written by reading the files, e.g. Numbers formatted as Strings.', () => {
      validContents.forEach((content) => {
        validPaths.forEach((path)=> {
          writeAnyValidData(content, path);
          expect(fs.existsSync(path)).toBe(true);
          expect(function() {
            const res = Treasurer.fileReader().readFrom(path);
            content.data = FileValidator.cleanData(content.data);
            return _.isEqual(res, content);
          }()).toBe(true);
        });
      });
    });
  });

  afterAll(() => {
    cleanTestDirectory();
  });
});
