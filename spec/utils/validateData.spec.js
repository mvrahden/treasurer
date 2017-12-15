'use strict';
const _DIR_ = './../../dist';

const FileValidator = require(_DIR_ + '/utils/file-validator').FileValidator;

const falseData = require('./testingData/invalidDataElements');
const validData = require('./testingData/validDataElements');

describe('The validation of data elements', () => {
  it('does not accept undefined, null, empty or deeper/nested structures.', () => {
    falseData.forEach((dataSet) => {
      expect(FileValidator.isValidData(dataSet)).toBe(false);
    });
  });

  it('does accept Strings (\'abc\', \'\'), Numbers (0, 1.23, NaN) and Booleans', () => {
    validData.forEach((dataSet) => {
      expect(FileValidator.isValidData(dataSet)).toBe(true);
    });
  });
});
