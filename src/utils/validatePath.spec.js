let isValid = require("./validatePath");

describe("The validation of path expects a valid path-String.", function() {
  let falsePath = [
    undefined,
    null,
    "falseValue",
    1.5,
    [],
  ];

  let falseExtensions = [
    "./path/toFile.xlsx",
    "./path/toFile.xls",
    "./path/toFile.docx",
    "./path/toFile.doc",
    "./path/toFile.js",
    "./path/toFile.ts",
    "./path/toFile.html",
    "./path/toFile.xml",
    "./path/toFile.xml"
  ];

  let validExtensions = [
    "./test.json",
    "./utils/test.json",
    "./utils/test.csv"
  ];

  it("Does not accept non-String values.", function() {
    falsePath.forEach((path) => {
      expect(isValid(path)).toBe(false);
    });
  });

  it("Does not accept path with false extensions.", function() {
    falseExtensions.forEach((path) => {
      expect(isValid(path)).toBe(false);
    });
  });

  it("Does not accept path w/o extensions.", function() {
    validExtensions.forEach((path) => {
      expect(isValid(path)).toBe(true);
    });
  });
});