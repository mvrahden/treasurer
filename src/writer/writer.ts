import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { ParsedPath } from 'path';

import { WriterConfig, DataSet, DatasetValidator } from '../utilities';

export abstract class Writer {
  protected _options: WriterConfig;
  protected _parsedPath: ParsedPath = null;
  protected _dataset: DataSet;
  protected _errors: Error[];

  constructor(options: WriterConfig, content: DataSet, errors: Error[]) {
    this._options = options;
    this._dataset = content;
    this._errors = errors;
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
    if (!DatasetValidator.isValidPath(filePath)) {
      this.catchError('writeTo: Please provide a valid path.');
    } else {
      this.parseFilePath(filePath);
      this.createNonexistingDirectories();
    }
    this.specificWrite(resolve, reject);
  }

  protected abstract specificWrite(resolve?: (value?: void | PromiseLike<void>) => void, reject?: (reason?: any) => void): void | Promise<void>;

  protected parseFilePath(filePath: string): void {
    filePath = Writer.specifyPathDelimiterForOS(filePath);
    filePath = path.normalize(filePath);
    this._parsedPath = path.parse(filePath);
  }

  protected static specifyPathDelimiterForOS(filePath: string): string {
    if (/(Windows)/.test(os.type())) { return filePath.replace(/\//g, '\\'); }
    else { return filePath.replace(/\\/g, path.sep); }
  }

  protected catchError(err: any): void {
    if (/ENOENT/.test(err)) {
      this.logError('writeTo: No such file or directory. (ENOENT)');
    }
    else if (/EACCES/.test(err)) {
      this.logError('writeTo: Permission denied. (EACCES)');
    }
    else if (/ECANCELED/.test(err)) {
      this.logError('writeTo: Operation canceled. (ECANCELED)');
    }
    else {
      this.logError(err.toString());
    }
  }

  protected logError(err: string): void {
    this._errors.push(new Error(err));
  }

  protected static isFunction(func: any): boolean {
    return func && typeof func === 'function';
  }

  protected createFilePathString(): string {
    if (this._parsedPath.dir === '') { return '.' + path.sep + this._parsedPath.base; }
    else { return this._parsedPath.dir + path.sep + this._parsedPath.base; }
  }

  protected convertData(): string {
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

  protected convertToXSV(delimiter: string = ','): string {
    let outputString = this._dataset.header.join(delimiter) + '\n';
    this._dataset.data.forEach((row: Array<number | string | boolean>) => {
      if (row.length > 0) {
        outputString += row.map(this.stringValueDelimitation).join(delimiter);
        outputString += '\n';
      }
    });
    return outputString;
  }

  protected stringValueDelimitation(value): string {
    if (typeof value === 'string' || value instanceof String) {
      if (value instanceof String) { value = value.toString(); }
      if (value === '') { return ('""'); } // empty string
      if (/\s/g.test(value)) { return ('"' + value + '"'); } // string contains spaces
      if (/^"(.*(?="$))"$/.test(value) || /^'(.*(?='$))'$/.test(value)) { return ('"' + value + '"'); } // string is delimited with quotes
      if (/^[+-]?(?=\d+)(?:\d+,)*\d*(?:\.\d+)?$/.test(value)) { return ('"' + value + '"'); } // string has number format
    }
    return value;
  }

  protected convertToTXT(): string {
    return this.convertToXSV(',');
  }

  protected createNonexistingDirectories(): void {
    this._parsedPath.dir.split(path.sep).reduce((dir: string, segment: string) => {
      this.createNonExistingDirectory(dir);
      dir = dir + path.sep + segment;
      this.createNonExistingDirectory(dir);
      return dir;
    });
  }

  protected createNonExistingDirectory(dir: string): void {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
  }
}
