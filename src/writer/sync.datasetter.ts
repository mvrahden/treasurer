import { DataSet, WriterConfig, DatasetValidator } from '../utilities';

import { DataSetter } from './datasetter';
import { PathSetter } from './pathsetter';
import { SyncPathSetter } from './sync.pathsetter';

export class SyncDataSetter extends DataSetter {

  constructor(options: WriterConfig, content: DataSet) {
    super(options, content);
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
    if (!DatasetValidator.isValidDataStructure(data)) {
      throw new Error('setData: accepts only 2-d Arrays.');
    }
    data = DatasetValidator.cleanData(data);
    if (!DatasetValidator.isValidData(data)) {
      throw new Error('setData: accepts only 2-d Arrays with Strings, Numbers and/or Booleans.');
    }
    this._dataset.data = data;

    return new SyncPathSetter(this._options, this._dataset);
  }
}
