'use strict';
const getExtension = require("../../src/utils/getExtension");

const falseExtensions = require('./testingData/invalidExtensions');
const validExtensions = require('./testingData/validExtensions');

describe("The Extension-Getter", () => {

  it("does not accept non-expected extensions.", () => {
    falseExtensions.forEach((path) => {
      expect(getExtension(path)).toBe('invalid');
    });
  });

  it("does return the real valid extension.", () => {
      expect(getExtension(validExtensions[0])).toBe('json');
      expect(getExtension(validExtensions[1])).toBe('json');
      expect(getExtension(validExtensions[2])).toBe('csv');
      expect(getExtension(validExtensions[3])).toBe('csv');
      expect(getExtension(validExtensions[4])).toBe('csv');
      expect(getExtension(validExtensions[5])).toBe('json');
      expect(getExtension(validExtensions[6])).toBe('txt');
  });
});