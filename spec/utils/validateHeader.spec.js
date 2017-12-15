'use strict';
const _DIR_ = './../../dist';

const FileValidator = require(_DIR_ + '/utils/file-validator').FileValidator;

describe('The validation of headers expects a 1D-Array of Strings or Numbers.', () => {
  const falseHeaders = [
    undefined,
    null,
    'falseValue',
    1.5,
    [],
    ['validValue', undefined],
    ['validValue', null],
    ['validValue', []],
    ['validValue', {}]];

  const validHeaders = [
    ['validValue', 'validValue'],
    ['validValue', 1.555]
  ];

  it('Does not accept undefined, null or empty or deep/nested structures.', () => {
    falseHeaders.forEach((falseHeader) => {
      expect(FileValidator.isValidHeader(falseHeader)).toBe(false);
    });
  });

  it('Does accept Strings and Numbers', () => {
    validHeaders.forEach((validHeader) => {
      expect(FileValidator.isValidHeader(validHeader)).toBe(true);
    });
  });
});
