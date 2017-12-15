'use strict';
const _DIR_ = './../../dist';

const FileValidator = require(_DIR_ + '/utils/file-validator').FileValidator;

const uncleanDataSets = [
  [['valid', undefined]],
  [['valid', null]]
];

const cleanDataSet = [['valid', '']];

describe('Data cleaning', () => {
  it('should transform undefined and null to empty String \'\'', () => {
    uncleanDataSets.forEach((uncleanDataSet) => {
      expect(function() {
        let cleanDataSet = FileValidator.cleanData(uncleanDataSet);
        return FileValidator.isValidData(cleanDataSet);
      }()).toBe(true);
    });
  });

  it('should transform undefined and null to empty String \'\'', () => {
    uncleanDataSets.forEach((uncleanDataSet) => {
      expect(FileValidator.cleanData(uncleanDataSet)).toBeTruthy(cleanDataSet);
    });
  });
});
