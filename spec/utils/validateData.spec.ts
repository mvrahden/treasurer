import { FileValidator } from "../../dist/utils/file-validator";
import { Valid } from './testingData/validTestingData';
import { Invalid } from "./testingData/invalidTestingData";

describe('The validation of data elements', () => {
  it('does not accept undefined, null, empty or deeper/nested structures.', () => {
    Invalid.dataElements.forEach((dataSet) => {
      expect(FileValidator.isValidData(dataSet)).toBe(false);
    });
  });

  it('does accept Strings (\'abc\', \'\'), Numbers (0, 1.23, NaN) and Booleans', () => {
    Valid.dataElements.forEach((dataSet) => {
      expect(FileValidator.isValidData(dataSet)).toBe(true);
    });
  });
});
