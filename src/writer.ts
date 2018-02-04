import { WriterConfig, DataSet, DatasetValidator } from './utilities';

import { Writer } from './writer/headersetter';
import { SyncHeaderSetter } from './writer/sync.headersetter';
import { AsyncHeaderSetter } from './writer/async.headersetter';
import { DataSetter } from './writer/datasetter';

export abstract class FileWriter {
  protected _options: WriterConfig;
  protected _dataset: DataSet;

  public static createWriter(options?: WriterConfig): Writer {
    options = options ? options : { sync: false, fileSystem: { encoding: 'utf8' } };

    if(options.sync) {
      return new SyncHeaderSetter(options);
    } else {
      return new AsyncHeaderSetter(options);
    }
  }

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
