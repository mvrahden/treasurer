import * as fs from 'fs';
import * as path from 'path';
import { ParsedPath } from 'path';

import { FileValidator } from "./utils/file-validator";
import { File } from './utils/file';

export class FileWriter {
  private content: File;

  constructor() { this.content = { header: null, data: null }; }

  /**
   * Captures the header.
   * @param {Array} header - 1D Array of Strings and/or Numbers.
   * @returns {Function} setData.
   * @throws {Error} if input doesn't meet the accepted scope.
   */
  public setHeader (header): DataSetter {
    if (!FileValidator.isValidHeader(header)) { throw Error('setHeader: Accepts only 1-d Arrays with valid Strings and Numbers.'); }
    this.content.header = header;
    return new DataSetter(this.content);
  }

}

export class DataSetter {
  private content;

  constructor(content: File) {
    this.content = content;
  }

  /**
   * Captures the data.
   * Accepts Numbers (1, 1.234, NaN), Strings ('abc', ''), booleans (true, false) and undefined & null.
   * Transforms undefined and null into empty Strings.
   * @param {Array} data - 2D Array of mixed values.
   * @returns {Function} writeTo.
   * @throws {Error} if input doesn't meet the accepted scope.
   */
  public setData(data): PathSetter {
    if (!FileValidator.isValidDataStructure(data)) { throw Error('setData: accepts only 2-d Arrays.'); }
    data = FileValidator.cleanData(data);
    if (!FileValidator.isValidData(data)) { throw Error('setData: accepts only 2-d Arrays with Strings, Numbers and/or Booleans.'); }
    this.content.data = data;
    return new PathSetter(this.content);
  }
}

export class PathSetter {
  private file: ParsedPath = null;
  private content: File;

  constructor(content: File) {
    this.content = content;
  }

  /**
   * Captures the file path and writes the given content to the file.
   * @param {String} filePath - String representation of the file path.
   * @returns {void}
   * @throws {Error} if input doesn't meet the accepted scope or if the writing process was aborted.
   */
  public writeTo(filePath: string): void {
    if (!FileValidator.isValidPath(filePath)) { throw Error('writeTo: Please provide a valid path.'); }
    filePath = path.normalize(filePath);
    this.file = path.parse(filePath);
    try {
      this.write();
    } catch (err) {
      if (/ENOENT/.test(err)) { throw Error('writeTo: No such file or directory. (ENOENT)'); }
      if (/EACCES/.test(err)) { throw Error('writeTo: Permission denied. (EACCES)'); }
      if (/ECANCELED/.test(err)) { throw Error('writeTo: Operation canceled. (ECANCELED)'); }
      throw err;
    }
  }

  private write(): void {
    const filePath = this.createFilePath();
    const data = this.convertData(this.content.header, this.content.data, this.file.ext);
    this.createNonexistingDirectories();
    fs.writeFileSync(filePath, data);
  }

  private createFilePath(): string {
    if (this.file.dir === '') { return '.' + path.sep + this.file.base; }
    else { return this.file.dir + path.sep + this.file.base; }
  }

  private convertData(header: any[], data: any[], ext): string {
    if (ext === '.csv') { return this.convertToCSV(header, data); }
    else if (ext === '.txt') { return this.convertToTXT(header, data); }
    else {
      return JSON.stringify({ 'header': header, 'data': data }, (key, value) => {
        if (Number.isNaN(value)) { return 'NaN'; }
        return value;
      });
    }
  }

  private convertToCSV(header: any[], data: any[]): string {
    let outputString = header.join(',') + '\n';
    data.forEach((row) => {
      outputString += row.map(this.stringValueDelimitation).join(',') + '\n';
    });
    return outputString;
  }

  private stringValueDelimitation(value): string {
    if (typeof value === 'string' || value instanceof String) {
      if (value instanceof String) { value = value.toString(); }
      if (value === '') { return ('""'); } // empty string
      if (/\s/g.test(value)) { return ('"' + value + '"'); } // string contains spaces
      if (/^"(.*(?="$))"$/.test(value) || /^'(.*(?='$))'$/.test(value)) { return ('"' + value + '"'); } // string is delimited with quotes
      if (/^[+-]?(?=\d+)(?:\d+,)*\d*(?:\.\d+)?$/.test(value)) { return ('"' + value + '"'); } // string has number format
    }
    return value;
  }

  private convertToTXT(header: any[], data: any[]): string {
    return this.convertToCSV(header, data);
  }

  private createNonexistingDirectories(): void {
    this.file.dir.split(path.sep).reduce((dir, segment) => {
      this.createUnexisting(dir);
      dir = dir + path.sep + segment;
      this.createUnexisting(dir);
      return dir;
    });
  }

  private createUnexisting(dir: string): void {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
  }

}
