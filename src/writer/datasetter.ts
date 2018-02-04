import { WriterConfig, DataSet } from '../utilities';
import { PathSetter } from './pathsetter';

export abstract class DataSetter {
  protected _options: WriterConfig;
  protected _dataset: DataSet;

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
  public abstract setData(data: Array<Array<any>>): PathSetter;
}
