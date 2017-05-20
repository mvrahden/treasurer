const isValid = require("../../src/utils/validateDataStructure");

const falseDataStructure = require('./testingData/invalidDataStructure');
const validDataStructure = require('./testingData/validDataStructure');

describe("A valid 2D-Array Data Structure", () => {

  it("should consist of exactly 2 Arrays.", () => {
    falseDataStructure.forEach((dataSet) => {
      expect(isValid(dataSet)).toBe(false);
    })
  });

  it("shouldn\'t accept an empty 2D Array.", () => {
      expect(isValid([[]])).toBe(false);
  });

  it("should accept any other 2D Array.", () => {
    validDataStructure.forEach((dataSet) => {
      expect(isValid(dataSet)).toBe(true);
    })
  });
});