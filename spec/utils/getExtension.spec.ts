import { ExtensionUtil } from '../../dist/utils/extension-util';
import { Valid } from './testingData/validTestingData';
import { Invalid } from './testingData/invalidTestingData';

describe('The Extension-Getter', () => {
  it('does not accept non-expected extensions.', () => {
    Invalid.extensions.forEach((path: string) => {
      expect(ExtensionUtil.getExtension(path)).toBe('invalid');
    });
  });

  it('does return the real valid extension.', () => {
    expect(ExtensionUtil.getExtension(Valid.extensions[0])).toBe('json');
    expect(ExtensionUtil.getExtension(Valid.extensions[1])).toBe('json');
    expect(ExtensionUtil.getExtension(Valid.extensions[2])).toBe('csv');
    expect(ExtensionUtil.getExtension(Valid.extensions[3])).toBe('csv');
    expect(ExtensionUtil.getExtension(Valid.extensions[4])).toBe('csv');
    expect(ExtensionUtil.getExtension(Valid.extensions[5])).toBe('json');
    expect(ExtensionUtil.getExtension(Valid.extensions[6])).toBe('txt');
  });
});
