import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { ParsedPath } from 'path';
import { promisify } from './polyfills/promisify';
const writeFile = promisify(fs.writeFile);

import { WriterConfig, DataSet, DatasetValidator } from "./utilities";
import { Writer } from './writer/writer';
import { SyncWriter } from './writer/sync.writer';
import { AsyncWriter } from './writer/async.writer';

export class FileWriter {
  private _options: WriterConfig;
  private _dataset: DataSet;
  private _errors: Error[] = [];

  public static createWriter(options?: WriterConfig): FileWriter {
    return new FileWriter(options);
  }

  private constructor(options?: WriterConfig) {
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
    if (!DatasetValidator.isValidHeader(header)) {
      this._errors.push(new Error('setHeader: Accepts only 1-d Arrays with valid Strings and Numbers.'));
    }
    this._dataset.header = header;
    return new DataSetter(this._options, this._dataset, this._errors);
  }

}

export class DataSetter {
  private _options: WriterConfig;
  private _dataset: DataSet;
  private _errors: Error[];

  constructor(options: WriterConfig, content: DataSet, errors: Error[]) {
    this._options = options;
    this._dataset = content;
    this._errors = errors;
  }

  /**
   * Captures the data.
   * Accepts Numbers (1, 1.234, NaN), Strings ('abc', ''), booleans (true, false) and undefined & null.
   * Transforms undefined and null into empty Strings.
   * @param {Array<Array<string | number | boolean>>} data - 2D Array of mixed values.
   * @returns {Function} writeTo.
   * @throws {Error} if input doesn't meet the accepted scope.
   */
  public setData(data: Array<Array<any>>): Writer {
    if (!DatasetValidator.isValidDataStructure(data)) {
      this._errors.push(new Error('setData: accepts only 2-d Arrays.'));
    }
    data = DatasetValidator.cleanData(data);
    if (!DatasetValidator.isValidData(data)) {
      this._errors.push(new Error('setData: accepts only 2-d Arrays with Strings, Numbers and/or Booleans.'));
    }
    this._dataset.data = data;

    return this.createWriter()
  }

  private createWriter(): Writer {
    if (this._options.sync) {
      return new SyncWriter(this._options, this._dataset, this._errors);
    } else {
      return new AsyncWriter(this._options, this._dataset, this._errors);
    }
  }
}
