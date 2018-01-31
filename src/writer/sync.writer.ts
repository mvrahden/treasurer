import * as fs from 'fs';

import { Writer } from './writer';
import { WriterConfig, DataSet } from '../utilities';

export class SyncWriter extends Writer {

  constructor(options: WriterConfig, content: DataSet, errors: Error[]) {
    super(options, content, errors);
  }

  protected specificWrite(resolve?: (value?: void | PromiseLike<void>) => void, reject?: (reason?: any) => void): void | Promise<void> {
    if(this._errors.length > 0) { throw this._errors[0]; }
    this.writeSync();
  }

  private writeSync(): void {
    const filePath = this.createFilePathString();
    const data = this.convertData();
    fs.writeFileSync(filePath, data, this._options.fileSystem);
  }
}