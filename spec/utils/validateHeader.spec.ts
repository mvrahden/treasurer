import { FileValidator } from "../../dist/utils/file-validator";
import { Valid } from './testingData/validTestingData';
import { Invalid } from './testingData/invalidTestingData';


describe('The validation of headers expects a 1D-Array of Strings or Numbers.', () => {

  it('Does not accept undefined, null or empty or deep/nested structures.', () => {
    Invalid.headers.forEach((falseHeader) => {
      expect(FileValidator.isValidHeader(falseHeader)).toBe(false);
    });
  });

  it('Does accept Strings and Numbers', () => {
    Valid.headers.forEach((validHeader) => {
      expect(FileValidator.isValidHeader(validHeader)).toBe(true);
    });
  });
});
