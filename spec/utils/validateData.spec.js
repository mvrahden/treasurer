let isValid = require("../../src/utils/validateData");

describe("The validation of data expects a 2D-Array of Strings or Numbers.", function() {
  let falseData = [
    undefined,
    null,
    "falseValue",
    1.5,
    [],
    [["validValue", "validValue"], undefined],
    [["validValue", "validValue"], null],
    [["validValue", "validValue"], [["false3dStructure"],["false3dStructure"]]],
    [["validValue", "validValue"], {falseObject: [["false3dStructure"],["false3dStructure"]]}]];

  let validData = [
    [["value", "value"], ["value", ""]],
    [["value", "value"], [1.23, 0]],
    [["value", "value"], [1.555, NaN]],
    [["value", "value"], [true, false]]
  ];

  it("Does not accept undefined, null or empty or deep/nested structures.", function() {
    falseData.forEach((dataSet) => {
      expect(isValid(dataSet)).toBe(false);
    })
  });

  it("Does accept Strings ('abc', ''), Numbers (0, 1.23, NaN) and Booleans", function() {
    validData.forEach((dataSet) => {
      expect(isValid(dataSet)).toBe(true);
    })
  });
});