import * as os from 'os';
import * as path from 'path';
import { ParsedPath } from 'path';

import { DataSet, ReaderConfig, DatasetValidator } from '../utilities';

export abstract class Reader {
  protected _options: ReaderConfig;
  protected _parsedPath: ParsedPath = null;
  protected _errors: Array<Error> = [];
  
  constructor(options: ReaderConfig) {
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
    if (!DatasetValidator.isValidPath(filePath)) {
      this.catchError('readFrom: Please provide a valid path. Got path: ' + path);
    } else {
      this.parseFilePath(filePath);
    }
    return this.specificRead(resolve, reject);
  }

  protected abstract specificRead(resolve?: (value?: DataSet | PromiseLike<DataSet>) => void, reject?: (reason?: any) => void): DataSet | Promise<DataSet>;

  protected catchError(err: any) {
    if(/path/.test(err)) {
      this.logError(err);
    }
    else if (/ENOENT/.test(err)) {
      this.logError('readFrom: No such file or directory. (ENOENT)');
    }
    else if (/EACCES/.test(err)) {
      this.logError('readFrom: Permission denied. (EACCES)');
    }
    else if (/ECANCELED/.test(err)) {
      this.logError('readFrom: Operation canceled. (ECANCELED)');
    }
    else if (/EJSONPARSE/.test(err)) {
      this.logError(err);
    }
  }

  private logError(err: string): void {
    if(this._options.sync) { throw new Error(err); }
    else { this._errors.push(new Error(err)); }
  }

  protected static specifyPathDelimiterForOS(filePath: string): string {
    if (/(Windows)/.test(os.type())) { return filePath.replace(/\//g, '\\'); }
    else { return filePath.replace(/\\/g, '/'); }
  }

  protected static isFunction(func: any): boolean {
    return func && typeof func === 'function';
  }


  protected convertData(data: string, extension: string): (any | DataSet) {
    if (extension === '.csv') { return Reader.convertFromXSV(data, ','); }
    if (extension === '.tsv') { return Reader.convertFromXSV(data, '\t'); }
    else if (extension === '.txt') { return Reader.convertFromTXT(data); }
    else {
      try {
        return JSON.parse(data, (key, value) => {
          if (value === 'NaN') { return Number.NaN; }
          else { return value; }
        });
      } catch (err) {
        this.catchError('readFrom: Couldn\'t Parse JSON-file format. (EJSONPARSE) Found the following content: ' + data);
      }
    }
  }

  protected static convertFromXSV(data: string, delimiter: string = 't'): DataSet {
    const content = { header: null, data: null };
    content.header = Reader.getHeaderFromXSV(data, delimiter);
    content.data = Reader.getDataFromXSV(data, delimiter);
    return content;
  }

  protected static getHeaderFromXSV(data: string, delimiter: string): any[] {
    return data.split('\n')[0].split(delimiter).map(Reader.mapEachValue);
  }

  protected static getDataFromXSV(data: string, delimiter: string = 't'): any[] {
    const rows = data.split('\n');
    const csvData = [];

    for (let i = 1; i < rows.length; i++) {
      if (rows[i].length > 0) {
        const row = rows[i].split(delimiter).map(Reader.mapEachValue);
        csvData.push(row);
      }
    }
    return csvData;
  }

  protected static convertFromTXT(data): DataSet {
    const content = { header: null, data: null };
    content.header = Reader.getHeaderFromTXT(data);
    content.data = Reader.getDataFromTXT(data);
    return content;
  }

  protected static getHeaderFromTXT(data: string): any[] {
    return Reader.getHeaderFromXSV(data, ',');
  }

  protected static getDataFromTXT(data: string): any[] {
    return Reader.getDataFromXSV(data, ',');
  }

  protected static mapEachValue(value) {
    if (value === 'undefined') { return undefined; }
    if (value === 'null') { return null; }
    if (value === 'true') { return true; }
    if (value === 'false') { return false; }
    if (value === 'NaN') { return Number.NaN; }
    if (/^"(.*(?="$))"$/.test(value)) { return value.slice(1, -1); }
    if (!Number.isNaN(Number(value))) { return Number(value); }
    return value;
  }

  protected parseFilePath(filePath: string) {
    filePath = Reader.specifyPathDelimiterForOS(filePath);
    filePath = path.normalize(filePath);
    this._parsedPath = path.parse(filePath);
  }

  protected createFilePath(): string {
    if (this._parsedPath.dir === '') { return '.' + path.sep + this._parsedPath.base; }
    else { return this._parsedPath.dir + path.sep + this._parsedPath.base; }
  }

}
