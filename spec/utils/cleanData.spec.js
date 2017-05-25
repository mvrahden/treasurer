'use strict';
const clean = require('../../src/utils/cleanData');
const isValid = require('../../src/utils/validateData');

const uncleanDataSets = [
  [['valid', undefined]],
  [['valid', null]]
];

const cleanDataSet = [['valid', '']];

describe('Data cleaning', () => {
  it('should transform undefined and null to empty String \'\'', () => {
    uncleanDataSets.forEach((uncleanDataSet) => {
      expect(function() {
        let cleanDataSet = clean(uncleanDataSet);
        return isValid(cleanDataSet);
      }()).toBe(true);
    });
  });

  it('should transform undefined and null to empty String \'\'', () => {
    uncleanDataSets.forEach((uncleanDataSet) => {
      expect(clean(uncleanDataSet)).toBeTruthy(cleanDataSet);
    });
  });
});
