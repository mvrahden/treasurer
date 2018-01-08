import { Valid } from './testingData/validTestingData';
import { Invalid } from './testingData/invalidTestingData';

import { DatasetValidator } from '../../dist/utilities';

describe('Path validation', () => {
  it('does not accept non-String values.', () => {
    Invalid.paths.forEach((path: string) => {
      expect(DatasetValidator.isValidPath(path)).toBe(false);
    });
  });

  it('does not accept path with false extensions.', () => {
    Invalid.extensions.forEach((path: string) => {
      expect(DatasetValidator.isValidPath(path)).toBe(false);
    });
  });

  it('does accept path declared valid extensions.', () => {
    Valid.extensions.forEach((path: string) => {
      expect(DatasetValidator.isValidPath(path)).toBe(true);
    });
  });
});
