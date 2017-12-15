'use strict';
const _DIR_ = './../../dist'

const ExtensionUtil = require(_DIR_+'/utils/extension-util').ExtensionUtil;

const falseExtensions = require('./testingData/invalidExtensions');
const validExtensions = require('./testingData/validExtensions');

describe('The Extension-Getter', () => {
  it('does not accept non-expected extensions.', () => {
    falseExtensions.forEach((path) => {
      expect(ExtensionUtil.getExtension(path)).toBe('invalid');
    });
  });

  it('does return the real valid extension.', () => {
    expect(ExtensionUtil.getExtension(validExtensions[0])).toBe('json');
    expect(ExtensionUtil.getExtension(validExtensions[1])).toBe('json');
    expect(ExtensionUtil.getExtension(validExtensions[2])).toBe('csv');
    expect(ExtensionUtil.getExtension(validExtensions[3])).toBe('csv');
    expect(ExtensionUtil.getExtension(validExtensions[4])).toBe('csv');
    expect(ExtensionUtil.getExtension(validExtensions[5])).toBe('json');
    expect(ExtensionUtil.getExtension(validExtensions[6])).toBe('txt');
  });
});
