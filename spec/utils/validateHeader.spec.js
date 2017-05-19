let isValid = require("../../src/utils/validateHeader");

describe("The validation of headers expects a 1D-Array of Strings or Numbers.", function() {
  let falseHeaders = [
    undefined,
    null,
    "falseValue",
    1.5,
    [],
    ["validValue", undefined],
    ["validValue", null],
    ["validValue", []],
    ["validValue", {}]];

  let validHeaders = [
    ["validValue", "validValue"],
    ["validValue", 1.555]
  ];

  it("Does not accept undefined, null or empty or deep/nested structures.", function() {
    falseHeaders.forEach((falseHeader) => {
      expect(isValid(falseHeader)).toBe(false);
    })
  });

  it("Does accept Strings and Numbers", function() {
    validHeaders.forEach((validHeader) => {
      expect(isValid(validHeader)).toBe(true);
    })
  });
});