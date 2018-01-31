import * as fs from 'fs';
import { promisify } from '../polyfills/promisify';
const writeFile = promisify(fs.writeFile);

import { Writer } from './writer';
import { WriterConfig, DataSet } from '../utilities';

export class AsyncWriter extends Writer {
  
  constructor(options: WriterConfig, content: DataSet, errors: Error[]) {
    super(options, content, errors);
  }

  protected specificWrite(resolve?: (value?: void | PromiseLike<void>) => void, reject?: (reason?: any) => void): void | Promise<void> {
    if (this._errors.length > 0) {
      const self = this;
      return new Promise(() => { throw this._errors[0]; }).catch((err) => {
        if (Writer.isFunction(reject)) { reject(err); }
      }) as Promise<void>;
    }
    return this.writeAsync(resolve, reject);
  }

  private writeAsync(resolve: (value?: void | PromiseLike<void>) => void, reject: (reason?: any) => void): Promise<void> {
    const filePath = this.createFilePathString();
    const data = this.convertData();
    const self = this;
    const promise = writeFile(filePath, data, this._options.fileSystem)
      .then((value) => {
        if (Writer.isFunction(resolve)) { resolve(value); }
      })
      .catch((err) => {
        if (Writer.isFunction(reject)) {
          try { self.catchError(err); } catch (err) {
            reject(err);
          }
        } else { self.catchError(err); }
      });
    return promise;
  }
}