const fs = require('fs');
const execSync = require('child_process').execSync;
const _ = require('lodash');

const Treasury = require('../index');
const clean = require('../src/utils/cleanData');

const validPaths = require('./testingData/validPaths');
const invalidPaths = require('./testingData/invalidPaths');
const validContents = require('./testingData/validFileContents');
const invalidContents = require('./testingData/invalidFileContents');

const cleanTestDirectory = function() {
  execSync('rm -rf ./test/');
};

const writeAllValid = function() {
  validContents.forEach((content) => {
    validPaths.forEach((path)=> {
      Treasury
        .setHeader(content.header)
        .setData(content.data)
        .writeTo(path);
    });
  });
};

describe('Treasury:', () => {

  describe('Writer', () => {
    
    beforeEach(() => {
      cleanTestDirectory();
    });

    it('should throw an error if given a false path.', () => {
      const someValidContent = validContents[0];
      invalidPaths.forEach((path)=> {
        expect(() => {
          Treasury
            .setHeader(someValidContent.header)
            .setData(someValidContent.data)
            .writeTo(path);
        }).toThrow();
      });
    });

    it('should throw an error for invalid files.', () => {
      invalidContents.forEach((content) => {
        validPaths.forEach((path)=> {
          expect(() => {
            Treasury
              .setHeader(content.header)
              .setData(content.data)
              .writeTo(path)
          }).toThrow();
        });
      });
    });

    it('should create the file even in deeply nested, non-existing directories.', () => {
      validContents.forEach((content) => {
        validPaths.forEach((path)=> {
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

    afterAll(() => {
      cleanTestDirectory();
    });

  });

  describe('Reader', () => {

    beforeAll(() => {
      writeAllValid();
    })

    it('should throw an error if given a false path.', () => {
      invalidPaths.forEach((path)=> {
        expect(() => {
          Treasury.readFrom(path);
        }).toThrow();
      });
    });

    it('should be able to read the files content.', () => {
      validContents.forEach((content) => {
        validPaths.forEach((path)=> {
          expect(fs.existsSync(path)).toBe(true);
          expect(() => {
            Treasury.readFrom(path);
          }).not.toThrow();
        });
      });
    });

  });

  describe('Treasury', () => {

    beforeAll(() => {
      writeAllValid();
    });

    xit('should be able to reconstruct the (cleaned) data that was written by reading the files, e.g. Numbers formatted as Strings.', () => {
      validContents.forEach((content) => {
        validPaths.forEach((path)=> {
          expect(fs.existsSync(path)).toBe(true);
          expect(function() {
            const res = Treasury.readFrom(path);
            content.data = clean(content.data);
            // console.log(res);
            // console.log(content);
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