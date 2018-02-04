import { WriterConfig, DatasetValidator } from '../utilities';

import { DataSetter } from './datasetter';
import { AsyncDataSetter } from './async.datasetter';

import { Writer } from './headersetter';

export class AsyncHeaderSetter extends Writer {

  protected _errors: Error[] = [];

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
      this._errors.push(new Error('setHeader: Accepts only 1-d Arrays with valid Strings and Numbers.'));
    }
    this._dataset.header = header;
    return new AsyncDataSetter(this._options, this._dataset, this._errors);
  }
}
