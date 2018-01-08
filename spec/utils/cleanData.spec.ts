import { DatasetValidator } from '../../dist/utilities';

const uncleanDataSets = [
  [['valid', undefined]],
  [['valid', null]]
];

const cleanDataSet = [['valid', '']];

describe('Data cleaning', () => {
  it('should transform undefined and null to empty String \'\'', () => {
    uncleanDataSets.forEach((uncleanDataSet) => {
      expect((() => {
        const cleanDataSet = DatasetValidator.cleanData(uncleanDataSet);
        return DatasetValidator.isValidData(cleanDataSet);
      })()).toBe(true);
    });
  });

  it('should transform undefined and null to empty String \'\'', () => {
    uncleanDataSets.forEach((uncleanDataSet) => {
      expect(DatasetValidator.cleanData(uncleanDataSet)).toBeTruthy(cleanDataSet);
    });
  });
});
