import { Valid } from './testingData/validTestingData';
import { Invalid } from './testingData/invalidTestingData';

import { DatasetValidator } from '../../../dist/utilities';

describe('A valid 2D-Array Data Structure', () => {
  it('should consist of exactly 2 Arrays.', () => {
    Invalid.dataStructures.forEach((dataSet) => {
      expect(DatasetValidator.isValidDataStructure(dataSet)).toBe(false);
    });
  });

  it('shouldn\'t accept an empty 2D Array.', () => {
      expect(DatasetValidator.isValidDataStructure([[]])).toBe(false);
  });

  it('should accept any other 2D Array.', () => {
    Valid.dataStructures.forEach((dataSet) => {
      expect(DatasetValidator.isValidDataStructure(dataSet)).toBe(true);
    });
  });
});
