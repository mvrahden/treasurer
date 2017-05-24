const fs = require('fs');
const execSync = require('child_process').execSync;

const reader = require('../src/reader');

const invalidPaths = require('./testingData/invalidPaths');

describe('Reader', () => {

  it('should throw an error if given a false path.', () => {
    invalidPaths.forEach((path)=> {
      expect(() => {
        Treasurer.readFrom(path);
      }).toThrow();
    });
  });

});