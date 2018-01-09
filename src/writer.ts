import * as fs from 'fs';
import * as path from 'path';
import * as util from 'util';
const promisify = util.promisify ? util.promisify : require('util.promisify');
import { ParsedPath } from 'path';


import { WriterConfig, DataSet, DatasetValidator } from "./utilities";

export class FileWriter {
  private _options: WriterConfig;
  private _dataset: DataSet;

  constructor(options?: WriterConfig) {
    this._options = options ? options : { sync: false, fileSystem: { encoding: 'utf8' } };
    this._dataset = { header: null, data: null };
  }

  /**
   * Captures the header.
   * @param {Array<string | number>} header - 1D Array of Strings and/or Numbers.
   * @returns {Function} setData.
   * @throws {Error} if input doesn't meet the accepted scope.
   */
  public setHeader(header: Array<string | number>): DataSetter {
    if (!DatasetValidator.isValidHeader(header)) { throw Error('setHeader: Accepts only 1-d Arrays with valid Strings and Numbers.'); }
    this._dataset.header = header;
    return new DataSetter(this._options, this._dataset);
  }

}

export class DataSetter {
  private _options: WriterConfig;
  private _dataset: DataSet;

  constructor(options: WriterConfig, content: DataSet) {
    this._options = options;
    this._dataset = content;
  }

  /**
   * Captures the data.
   * Accepts Numbers (1, 1.234, NaN), Strings ('abc', ''), booleans (true, false) and undefined & null.
   * Transforms undefined and null into empty Strings.
   * @param {Array<Array<string | number | boolean>>} data - 2D Array of mixed values.
   * @returns {Function} writeTo.
   * @throws {Error} if input doesn't meet the accepted scope.
   */
  public setData(data: Array<Array<any>>): PathSetter {
    if (!DatasetValidator.isValidDataStructure(data)) { throw Error('setData: accepts only 2-d Arrays.'); }
    data = DatasetValidator.cleanData(data);
    if (!DatasetValidator.isValidData(data)) { throw Error('setData: accepts only 2-d Arrays with Strings, Numbers and/or Booleans.'); }
    this._dataset.data = data;
    return new PathSetter(this._options, this._dataset);
  }
}

export class PathSetter {
  private _options: WriterConfig;
  private _parsedPath: ParsedPath = null;
  private _dataset: DataSet;

  constructor(options: WriterConfig, content: DataSet) {
    this._options = options;
    this._dataset = content;
  }

  /**
   * Captures the file path and writes the given content to the file.
   * @param {String} filePath - String representation of the file path.
   * @param {(value?: (value?: void | PromiseLike<void>) => void} [resolve] - optional custom resolve function for async writing.
   * @param {(reason?: any) => void} [reject] - optional custom reject function for async writing.
   * @returns {void | Promise<void>} - returns a Promise on async call, otherwise it returns void.
   * @throws {Error} if input doesn't meet the accepted scope or if the writing process was aborted.
   */
  public writeTo(filePath: string, resolve?: (value?: void | PromiseLike<void>) => void, reject?: (reason?: any) => void): void | Promise<void> {
    if (!DatasetValidator.isValidPath(filePath)) { throw Error('writeTo: Please provide a valid path.'); }
    filePath = path.normalize(filePath);
    this._parsedPath = path.parse(filePath);
    this.createNonexistingDirectories();
    if (this._options.sync) {
      try { this.writeSync(); }
      catch (err) { this.catchError(err); }
    } else { return this.writeAsync(resolve, reject); }
  }

  private catchError(err: any) {
    if (/ENOENT/.test(err)) { throw new Error('writeTo: No such file or directory. (ENOENT)'); }
    else if (/EACCES/.test(err)) { throw new Error('writeTo: Permission denied. (EACCES)'); }
    else if (/ECANCELED/.test(err)) { throw new Error('writeTo: Operation canceled. (ECANCELED)'); }
    else { throw err; }
  }

  private writeSync(): void {
    const filePath = this.createFilePathString();
    const data = this.convertData();
    fs.writeFileSync(filePath, data, this._options.fileSystem);
  }

  private writeAsync(resolve: (value?: void | PromiseLike<void>) => void, reject: (reason?: any) => void): Promise<void> {
    const filePath = this.createFilePathString();
    const data = this.convertData();
    const self = this;
    const writeFile = promisify(fs.writeFile);
    return writeFile(filePath, data, this._options.fileSystem)
      .then((value) => {
        resolve(value);
      })
      .catch((err) => {
        if (reject) {
          try {
            self.catchError(err);
          } catch (err) {
            reject(err);
          }
        } else {
          self.catchError(err);
        }
      });
  }

  private createFilePathString(): string {
    if (this._parsedPath.dir === '') { return '.' + path.sep + this._parsedPath.base; }
    else { return this._parsedPath.dir + path.sep + this._parsedPath.base; }
  }

  private convertData(): string {
    if (this._parsedPath.ext === '.csv') { return this.convertToXSV(','); }
    else if (this._parsedPath.ext === '.tsv') { return this.convertToXSV('\t'); }
    else if (this._parsedPath.ext === '.txt') { return this.convertToTXT(); }
    else {
      return JSON.stringify({ 'header': this._dataset.header, 'data': this._dataset.data }, (key, value) => {
        if (Number.isNaN(value)) { return 'NaN'; }
        return value;
      });
    }
  }

  private convertToXSV(delimiter: string = ','): string {
    let outputString = this._dataset.header.join(delimiter) + '\n';
    this._dataset.data.forEach((row: Array<number | string | boolean>) => {
      outputString += row.map(this.stringValueDelimitation).join(delimiter) + '\n';
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

  private convertToTXT(): string {
    return this.convertToXSV(',');
  }

  private createNonexistingDirectories(): void {
    this._parsedPath.dir.split(path.sep).reduce((dir, segment) => {
      this.createNonExistingDirectory(dir);
      dir = dir + path.sep + segment;
      this.createNonExistingDirectory(dir);
      return dir;
    });
  }

  private createNonExistingDirectory(dir: string): void {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
  }

}
