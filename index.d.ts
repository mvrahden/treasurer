
/**
 * A lightweight tool to read and write feature-sets (2D Data).
 */
declare interface Treasurer{
  /**
   * Captures the header.
   * @param {Array} header - 1D Array of Strings and/or Numbers.
   * @returns {Function} setData.
   * @throws {Error} if input doesn't meet the accepted scope.
   */
  setHeader(header: Array): setData

  /**
   * Reads the content of the given file path.
   * @param {String} filePath - String representation of a file path.
   * @returns {Object} dataSet-Object containing the header and the corresponding data.
   * @throws {Error} if input doesn't meet the accepted scope or if the writing process was aborted.
   */
  readFrom(path: String): DataObject
}

/**
 * Captures the data.
 * Accepts Numbers (1, 1.234, NaN), Strings ('abc', ''), booleans (true, false) and undefined & null.
 * Transforms undefined and null into empty Strings.
 * @param {Array} data - 2D Array of mixed values.
 * @returns {Function} writeTo.
 * @throws {Error} if input doesn't meet the accepted scope.
 */
declare function setData(data: Array): writeTo

/**
 * Captures the file path and writes the given content to the file.
 * @param {String} filePath - String representation of the file path.
 * @returns {void}
 * @throws {Error} if input doesn't meet the accepted scope or if the writing process was aborted.
 */
declare function writeTo(path: String): void

declare class DataObject {
  header: Array
  data: Array
}

export = Treasurer;
