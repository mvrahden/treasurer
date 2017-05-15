let getExtension = require("./getExtension");

describe("The Extension-Getter determines the Extension through a path-String.", function() {

  let falseExtensions = [
    "./path/toFile.xlsx",
    "./path/toFile.xls",
    "./path/toFile.docx",
    "./path/toFile.doc",
    "./path/toFile.js",
    "./path/toFile.ts",
    "./path/toFile.html",
    "./path/toFile.xml"
  ];

  let validExtensions = [
    "./test.json",
    "./utils/test.json",
    "./utils/test.csv",
    "./utils/test.csv.csv",
    "./utils/test.json.csv",
    "./utils/test.csv.json",
    "./utils/test.csv.txt"
  ];

  it("Does not accept non-expected extensions.", function() {
    falseExtensions.forEach((path) => {
      expect(getExtension(path)).toBe('invalid');
    });
  });

  it("Does return the real valid extension.", function() {
      expect(getExtension(validExtensions[0])).toBe('json');
      expect(getExtension(validExtensions[1])).toBe('json');
      expect(getExtension(validExtensions[2])).toBe('csv');
      expect(getExtension(validExtensions[3])).toBe('csv');
      expect(getExtension(validExtensions[4])).toBe('csv');
      expect(getExtension(validExtensions[5])).toBe('json');
      expect(getExtension(validExtensions[6])).toBe('txt');
  });
});