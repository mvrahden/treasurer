'use strict';

const reader = require('../src/reader');

const invalidPaths = require('./testingData/invalidPaths');

describe('Reader', () => {
  it('should throw an error if given a false path.', () => {
    invalidPaths.forEach((path)=> {
      expect(() => {
        reader.readFrom(path);
      }).toThrowError(/path/);
    });
  });
});
