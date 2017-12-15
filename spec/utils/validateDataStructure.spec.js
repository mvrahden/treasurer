'use strict';
const _DIR_ = './../../dist';

const FileValidator = require(_DIR_ + '/utils/file-validator').FileValidator;

const falseDataStructure = require('./testingData/invalidDataStructure');
const validDataStructure = require('./testingData/validDataStructure');

describe('A valid 2D-Array Data Structure', () => {
  it('should consist of exactly 2 Arrays.', () => {
    falseDataStructure.forEach((dataSet) => {
      expect(FileValidator.isValidDataStructure(dataSet)).toBe(false);
    });
  });

  it('shouldn\'t accept an empty 2D Array.', () => {
      expect(FileValidator.isValidDataStructure([[]])).toBe(false);
  });

  it('should accept any other 2D Array.', () => {
    validDataStructure.forEach((dataSet) => {
      expect(FileValidator.isValidDataStructure(dataSet)).toBe(true);
    });
  });
});
