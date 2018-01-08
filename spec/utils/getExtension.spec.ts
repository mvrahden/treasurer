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
    expect(ExtensionValidator.getExtension(Valid.extensions[0])).toBe('json');
    expect(ExtensionValidator.getExtension(Valid.extensions[1])).toBe('json');
    expect(ExtensionValidator.getExtension(Valid.extensions[2])).toBe('csv');
    expect(ExtensionValidator.getExtension(Valid.extensions[3])).toBe('csv');
    expect(ExtensionValidator.getExtension(Valid.extensions[4])).toBe('csv');
    expect(ExtensionValidator.getExtension(Valid.extensions[5])).toBe('json');
    expect(ExtensionValidator.getExtension(Valid.extensions[6])).toBe('txt');
  });
});
