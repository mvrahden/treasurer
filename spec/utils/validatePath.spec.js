'use strict';
const isValid = require('../../src/utils/validatePath');

const falsePaths = require('./testingData/invalidPaths');
const falseExtensions = require('./testingData/invalidExtensions');
const validExtensions = require('./testingData/validExtensions');

describe('Path validation', () => {
  it('does not accept non-String values.', () => {
    falsePaths.forEach((path) => {
      expect(isValid(path)).toBe(false);
    });
  });

  it('does not accept path with false extensions.', () => {
    falseExtensions.forEach((path) => {
      expect(isValid(path)).toBe(false);
    });
  });

  it('does accept path declared valid extensions.', () => {
    validExtensions.forEach((path) => {
      expect(isValid(path)).toBe(true);
    });
  });
});
