'use strict';
const _DIR_ = './../../dist';

const FileValidator = require(_DIR_+'/utils/file-validator').FileValidator;

const falsePaths = require('./testingData/invalidPaths');
const falseExtensions = require('./testingData/invalidExtensions');
const validExtensions = require('./testingData/validExtensions');

describe('Path validation', () => {
  it('does not accept non-String values.', () => {
    falsePaths.forEach((path) => {
      expect(FileValidator.isValidPath(path)).toBe(false);
    });
  });

  it('does not accept path with false extensions.', () => {
    falseExtensions.forEach((path) => {
      expect(FileValidator.isValidPath(path)).toBe(false);
    });
  });

  it('does accept path declared valid extensions.', () => {
    validExtensions.forEach((path) => {
      expect(FileValidator.isValidPath(path)).toBe(true);
    });
  });
});
