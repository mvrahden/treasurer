import * as fs from 'fs';

import { Reader } from './reader';
import { ReaderConfig, DataSet } from '../utilities';


export class SyncReader extends Reader {
  constructor(options: ReaderConfig) {
    super(options);
  }

  protected specificRead(resolve?: (value?: DataSet | PromiseLike<DataSet>) => void, reject?: (reason?: any) => void): DataSet | Promise<DataSet> {
    if (this._errors.length > 0) {
      throw this._errors[0];
    }
    return this.readSync();
  }

  private readSync(): DataSet {
    const filePath = this.createFilePath();
    const rawData = fs.readFileSync(filePath, this._options.fileSystem).toString();
    return this.convertData(rawData, this._parsedPath.ext);
  }

}
