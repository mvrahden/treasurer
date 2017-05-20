const isValid = require("../../src/utils/validateData");

const falseData = require('./testingData/invalidDataElements');
const validData = require('./testingData/validDataElements');

describe("The validation of data elements", () => {

  it("does not accept undefined, null, empty or deeper/nested structures.", () => {
    falseData.forEach((dataSet) => {
      expect(isValid(dataSet)).toBe(false);
    })
  });

  it("does accept Strings ('abc', ''), Numbers (0, 1.23, NaN) and Booleans", () => {
    validData.forEach((dataSet) => {
      expect(isValid(dataSet)).toBe(true);
    })
  });

});