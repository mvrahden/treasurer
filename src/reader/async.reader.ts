import * as fs from 'fs';
import { promisify } from '../polyfills/promisify';
const readFile = promisify(fs.readFile);

import { Reader } from './reader';
import { ReaderConfig, DataSet } from '../utilities';

export class AsyncReader extends Reader {

  constructor(options: ReaderConfig) {
    super(options);
  }

  protected specificRead(resolve: (value?: DataSet | PromiseLike<DataSet>) => void, reject: (reason?: any) => void): Promise<DataSet> {
    if (this._errors.length > 0) {
      const self = this;
      return new Promise(() => { throw this._errors[0]; }).catch((err) => {
        if (Reader.isFunction(reject)) { reject(err); }
      }) as Promise<DataSet>;
    }
    return this.readAsync(resolve, reject);
  }

  private readAsync(resolve: (value?: DataSet | PromiseLike<DataSet>) => void, reject: (reason?: any) => void): Promise<DataSet> {
    const filePath = this.createFilePath();
    const extension = this._parsedPath.ext;
    const self = this;
    const promise = readFile(filePath, this._options.fileSystem)
      .then((data: Buffer | string) => {
        const dataset = self.convertData(data.toString(), extension);
        return dataset;
      })
      .then((dataset: DataSet) => {
        if (self._errors.length > 0) {
          throw self._errors[0];
        }
        return dataset;
      })
      .then((dataset: DataSet) => {
        if (Reader.isFunction(resolve)) {
          resolve(dataset);
        } else {
          return dataset;
        }
      }).catch((err) => {
        if (Reader.isFunction(reject)) {
          reject(err);
        } else {
          throw err;
        }
      });

    return promise;
  }
}
