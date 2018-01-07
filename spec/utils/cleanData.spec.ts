import { FileValidator } from "../../dist/utils/file-validator";

const uncleanDataSets = [
  [['valid', undefined]],
  [['valid', null]]
];

const cleanDataSet = [['valid', '']];

describe('Data cleaning', () => {
  it('should transform undefined and null to empty String \'\'', () => {
    uncleanDataSets.forEach((uncleanDataSet) => {
      expect((() => {
        const cleanDataSet = FileValidator.cleanData(uncleanDataSet);
        return FileValidator.isValidData(cleanDataSet);
      })()).toBe(true);
    });
  });

  it('should transform undefined and null to empty String \'\'', () => {
    uncleanDataSets.forEach((uncleanDataSet) => {
      expect(FileValidator.cleanData(uncleanDataSet)).toBeTruthy(cleanDataSet);
    });
  });
});
