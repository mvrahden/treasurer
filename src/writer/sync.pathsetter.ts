import * as fs from 'fs';

import { PathSetter } from './pathsetter';
import { WriterConfig, DataSet } from '../utilities';

export class SyncPathSetter extends PathSetter {

  constructor(options: WriterConfig, content: DataSet) {
    super(options, content);
  }

  protected handleError(err: string): void {
    throw new Error(err);
  }

  protected specificWrite(resolve?: (value?: void | PromiseLike<void>) => void, reject?: (reason?: any) => void): void | Promise<void> {
    this.writeSync();
  }

  private writeSync(): void {
    const filePath = this.createFilePathString();
    const data = this.convertData();
    fs.writeFileSync(filePath, data, this._options.fileSystem);
  }
}