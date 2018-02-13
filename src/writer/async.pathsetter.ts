import * as fs from 'fs';
import { promisify } from '../polyfills/promisify';
const writeFile = promisify(fs.writeFile);

import { PathSetter } from './pathsetter';
import { WriterConfig, DataSet } from '../utilities';

export class AsyncPathSetter extends PathSetter {
  protected _errors: Error[];
  
  constructor(options: WriterConfig, content: DataSet, errors: Error[]) {
    super(options, content);
    this._errors = errors;
  }

  protected handleError(err: string): void {
    this._errors.push(new Error(err));
  }

  protected specificWrite(resolve?: (value?: void | PromiseLike<void>) => void, reject?: (reason?: any) => void): void | Promise<void> {
    if (this._errors.length > 0) { return this.rejectAsPromiseIfError(reject); }
    return this.writeAsync(resolve, reject);
  }
  
  protected rejectAsPromiseIfError(reject) {
    const self = this;
    return new Promise(() => { throw self._errors[0]; }).catch((err) => {
      if (PathSetter.isFunction(reject)) { reject(err); }
    }) as Promise<void>;
  }
  
  private writeAsync(resolve: (value?: void | PromiseLike<void>) => void, reject: (reason?: any) => void): Promise<void> {
    const filePath = this.createFilePathString();
    const data = this.convertData();
    if (this._errors.length > 0) { return this.rejectAsPromiseIfError(reject); }
    const self = this;
    const promise = writeFile(filePath, data, this._options.fileSystem)
      .then((value) => {
        if (PathSetter.isFunction(resolve)) { resolve(value); }
      })
      .catch((err) => {
        if (PathSetter.isFunction(reject)) {
          try {
            self.catchError(err);
            throw self._errors[0];
          } catch (err) {
            reject(err);
          }
        } else { self.catchError(err); }
      });
    return promise;
  }
}