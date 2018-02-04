import { WriterConfig, DatasetValidator } from '../utilities';

import { DataSetter } from './datasetter';
import { SyncDataSetter } from './sync.datasetter';

import { Writer } from './headersetter';

export class SyncHeaderSetter extends Writer {

  constructor(options: WriterConfig) {
    super(options);
  }

  /**
   * Captures the header.
   * @param {Array<string | number>} header - 1D Array of Strings and/or Numbers.
   * @returns {Function} setData.
   * @throws {Error} if input doesn't meet the accepted scope.
   */
  public setHeader(header: Array<string | number>): DataSetter {
    if (!DatasetValidator.isValidHeader(header)) {
      throw new Error('setHeader: Accepts only 1-d Arrays with valid Strings and Numbers.');
    }
    this._dataset.header = header;

    return new SyncDataSetter(this._options, this._dataset);
  }
}
