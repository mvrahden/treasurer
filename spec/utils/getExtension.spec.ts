import { Valid } from './testingData/validTestingData';
import { Invalid } from './testingData/invalidTestingData';

import { ExtensionValidator } from '../../dist/utilities';

describe('The Extension-Getter', () => {
  it('does not accept non-expected extensions.', () => {
    Invalid.extensions.forEach((path: string) => {
      expect(ExtensionValidator.getExtension(path)).toBe('invalid');
    });
  });

  it('does return the real valid extension.', () => {
    Valid.extensions.forEach((testCase) => {
      expect(ExtensionValidator.getExtension(testCase.actual)).toBe(testCase.expected);
    });
  });
});
