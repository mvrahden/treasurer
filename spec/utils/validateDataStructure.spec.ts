import { FileValidator } from '../../dist/utils/file-validator';
import { Valid } from './testingData/validTestingData';
import { Invalid } from './testingData/invalidTestingData';

describe('A valid 2D-Array Data Structure', () => {
  it('should consist of exactly 2 Arrays.', () => {
    Invalid.dataStructures.forEach((dataSet) => {
      expect(FileValidator.isValidDataStructure(dataSet)).toBe(false);
    });
  });

  it('shouldn\'t accept an empty 2D Array.', () => {
      expect(FileValidator.isValidDataStructure([[]])).toBe(false);
  });

  it('should accept any other 2D Array.', () => {
    Valid.dataStructures.forEach((dataSet) => {
      expect(FileValidator.isValidDataStructure(dataSet)).toBe(true);
    });
  });
});
