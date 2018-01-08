import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';
import { ParsedPath } from 'path';

import { ReaderConfig, DataSet, DatasetValidator } from './utilities';

export class FileReader {
  private _parsedPath: ParsedPath = null;
  private _options: ReaderConfig;

  constructor(options?: ReaderConfig) {
    this._options = options ? options : { sync: false, fileSystem: { encoding: 'utf8' } };
  }

  /**
   * Reads the content of the given file path.
   * @param {String} filePath - String representation of a file path.
   * @param {(value?: DataSet | PromiseLike<DataSet>) => void} [resolve] - optional custom resolve function for async reading.
   * @param {(reason?: any) => void} [reject] - optional custom reject function to catch async reading.
   * @returns {DataSet | Promise<DataSet>} dataSet-Object containing the header and the corresponding data.
   * @throws {Error} if input doesn't meet the accepted scope or if the writing process was aborted.
   */
  public readFrom(filePath: string, resolve?: (value?: DataSet | PromiseLike<DataSet>) => void, reject?: (reason?: any) => void): DataSet | Promise<DataSet> {
    if (!DatasetValidator.isValidPath(filePath)) { throw Error('readFrom: Please provide a valid path.'); }
    this.parseFilePath(filePath);
    if (this._options.sync) {
      try { return this.readSync(); }
      catch (err) { this.catchError(err); }
    } else { return this.readAsync(resolve, reject); }
  }

  private catchError(err: any) {
    if (/ENOENT/.test(err)) { throw new Error('readFrom: No such file or directory. (ENOENT)'); }
    if (/EACCES/.test(err)) { throw new Error('readFrom: Permission denied. (EACCES)'); }
    if (/ECANCELED/.test(err)) { throw new Error('readFrom: Operation canceled. (ECANCELED)'); }
    throw err;
  }

  private parseFilePath(filePath: string) {
    filePath = path.normalize(filePath);
    this._parsedPath = path.parse(filePath);
  }

  private readSync(): DataSet {
    const filePath = this.createFilePath();
    const rawData = fs.readFileSync(filePath, this._options.fileSystem).toString();
    return this.convertData(rawData);
  }

  private readAsync(resolve: (value?: DataSet | PromiseLike<DataSet>) => void, reject: (reason?: any) => void): Promise<DataSet> {
    const filePath = this.createFilePath();
    const readFile = promisify(fs.readFile);
    const self = this;
    return readFile(filePath, this._options.fileSystem)
      .then((data: Buffer | string) => {
        const file = self.convertData(data.toString());
        if (resolve) {
          return resolve(file);
        }
        else { return file; }
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

  private createFilePath(): string {
    if (this._parsedPath.dir === '') { return '.' + path.sep + this._parsedPath.base; }
    else { return this._parsedPath.dir + path.sep + this._parsedPath.base; }
  }

  private convertData(data: string): (any | DataSet) {
    if (this._parsedPath.ext === '.csv') { return this.convertFromXSV(data, ','); }
    if (this._parsedPath.ext === '.tsv') { return this.convertFromXSV(data, '\t'); }
    else if (this._parsedPath.ext === '.txt') { return this.convertFromTXT(data); }
    else {
      return JSON.parse(data, (key, value) => {
        if (value === 'NaN') { return Number.NaN; }
        else { return value; }
      });
    }
  }

  private convertFromXSV(data: string, delimiter: string = 't'): DataSet {
    const content = { header: null, data: null };
    content.header = FileReader.getHeaderFromXSV(data, delimiter);
    content.data = FileReader.getDataFromXSV(data, delimiter);
    return content;
  }

  private static getHeaderFromXSV(data: string, delimiter: string): any[] {
    return data.split('\n')[0].split(delimiter).map(FileReader.mapEachValue);
  }

  private static getDataFromXSV(data: string, delimiter: string = 't'): any[] {
    const rows = data.split('\n');
    const csvData = [];

    for (let i = 1; i < rows.length; i++) {
      if (rows[i].length > 0) {
        const row = rows[i].split(delimiter).map(FileReader.mapEachValue);
        csvData.push(row);
      }
    }
    return csvData;
  }

  private convertFromTXT(data): DataSet {
    const content = { header: null, data: null };
    content.header = FileReader.getHeaderFromTXT(data);
    content.data = FileReader.getDataFromTXT(data);
    return content;
  }

  private static getHeaderFromTXT(data: string): any[] {
    return FileReader.getHeaderFromXSV(data, ',');
  }

  private static getDataFromTXT(data: string): any[] {
    return FileReader.getDataFromXSV(data, ',');
  }

  private static mapEachValue(value) {
    if (value === 'undefined') { return undefined; }
    if (value === 'null') { return null; }
    if (value === 'true') { return true; }
    if (value === 'false') { return false; }
    if (value === 'NaN') { return Number.NaN; }
    if (/^"(.*(?="$))"$/.test(value)) { return value.slice(1, -1); }
    if (!Number.isNaN(Number(value))) { return Number(value); }
    return value;
  }

}
