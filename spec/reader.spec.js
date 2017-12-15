'use strict';
const _DIR_ = '../dist';

const FileReader = require(_DIR_+'/reader').FileReader;

const invalidPaths = require('./testingData/invalidPaths');

describe('Reader', () => {
  it('should throw an error if given a false path.', () => {
    invalidPaths.forEach((path)=> {
      expect(() => {
        new FileReader().readFrom(path);
      }).toThrowError(/path/);
    });
  });
});
