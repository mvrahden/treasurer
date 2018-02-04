import { DataSet, WriterConfig } from '../utilities';
import { DataSetter } from './datasetter';

export abstract class Writer {
  protected _options: WriterConfig;
  protected _dataset: DataSet;

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
  public abstract setHeader(header: Array<string | number>): DataSetter;

}
