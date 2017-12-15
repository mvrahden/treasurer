import { ExtensionUtil } from "./extension-util";

export class FileValidator {
  /**
   * Validates the elements of a 1D Array of mixed values.
   * Accepts only Strings and/or Numbers.
   * @param {any[]} header - 1D Array of Strings or Numbers.
   * @returns {boolean} State of Validation.
   */
  public static isValidHeader (header) {
    if (header === undefined) { return false; }
    if (header === null) { return false; }
    if (!(header instanceof Array)) { return false; }
    if (header.length === 0) { return false; }
    for (let i = 0; i < header.length; i++) {
      if (!FileValidator.isValidHeaderElement(header[i])) { return false; }
    }
    return true;
  };

  private static isValidHeaderElement (element) {
    return !(element === undefined) && !(element === null) && !(element instanceof Object);
  };

  /**
   * Validates the elements of the given 2D-Array dataSet.
   * Accepts elements of type Number (1, 1.234, NaN), String ('abc', '') and boolean (true, false).
   * @param {Array} dataSet - 2D Array of mixed (Number, String, boolean) values.
   * @returns {boolean} State of Validation.
   */
  public static isValidData(dataSet) {
    if (!FileValidator.containsValidRows(dataSet)) { return false; }
    return true;
  }

  private static containsValidRows(dataSet) {
    for (let i = 0; i < dataSet.length; i++) {
      if (!FileValidator.containsValidElements(dataSet[i])) { return false; }
    }
    return true;
  }

  private static containsValidElements(row) {
    for (let i = 0; i < row.length; i++) {
      if (!FileValidator.isValidDataElement(row[i])) { return false; }
    }
    return true;
  }

  private static isValidDataElement(element) {
    return !(element === undefined) && !(element === null) && !(element instanceof Function) && !(element instanceof Object);
  }

  /**
   * Validates the path.
   * Accepts only a String representation of a file path - including the extension.
   * @param {String} path - String representation of a file path.
   * @returns {boolean} State of Validation.
   */
  public static isValidPath (path) {
    if (path === undefined) { return false; }
    if (path === null) { return false; }
    if (!(typeof path === 'string')) { return false; }
    if (!FileValidator.includesExtension(path)) { return false; }
    return true;
  }

  private static includesExtension (path) {
    return ExtensionUtil.getExtension(path) !== 'invalid';
  }

  /**
   * Validates the raw structure of the given dataSet.
   * Accepts a 2D Array with at least one row of any data.
   * Does not check types of the rows' elements, e.g. nested structures.
   * @param {Array} dataSet - 2D Array.
   * @returns {boolean} State of Validation.
   */
  public static isValidDataStructure (dataSet) {
    if (!FileValidator.isValidArray(dataSet)) { return false; }
    if (!FileValidator.areValidRows(dataSet)) { return false; }
    return true;
  }

  private static isValidArray (dataSet) {
    if (dataSet === undefined) { return false; }
    if (dataSet === null) { return false; }
    if (!(dataSet instanceof Array)) { return false; }
    if (dataSet.length === 0) { return false; }
    return true;
  }

  private static areValidRows (dataSet) {
    for (let i = 0; i < dataSet.length; i++) {
      if (!FileValidator.isValidArray(dataSet[i])) { return false; }
    }
    return true;
  }

  /**
   * Cleans unwanted values (undefined, null) of a 2D Array.
   * @param {Array} dataSet - 2D Array of mixed values.
   * @returns {Array} dataSet with cleaned values.
   */
  public static cleanData (dataSet: any[][]): any[][] {
    const cleanedDataSet = [];
    dataSet.forEach((row) => {
      const cleanedRow = FileValidator.cleanRow(row);
      cleanedDataSet.push(cleanedRow);
    });
    return cleanedDataSet;
  };

  private static cleanRow (row: any[]): any[] {
    const cleanedRow = [];
    row.forEach((element) => {
      element = FileValidator.cleanElement(element);
      cleanedRow.push(element);
    });
    return cleanedRow;
  };

  private static cleanElement (element: any): any {
    if (element === undefined || element === null) { return ''; }
    return element;
  };
}
