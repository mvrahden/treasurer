import { WriterConfig, ReaderConfig } from './utilities';

import { FileWriter } from './writer';
import { Writer } from './writer/headersetter';
import { FileReader } from './reader';
import { Reader } from './reader/reader';

export class Treasurer {

  /**
   * Pre-configures the file writer with given options.
   * @param {WriterConfig} [options = {sync: false, {encoding: 'utf8'}}] contains several options.
   * @returns file writing facility
   */
  public static fileWriter(options?: WriterConfig): Writer {
    return FileWriter.createWriter(options);
  }

  /**
   * Pre-configures the file reader with given options.
   * @param {WriterConfig} [options = {sync: false, {endoding: 'utf8'}}] contains several options.
   * @returns file reading facility
   */
  public static fileReader(options?: ReaderConfig): Reader {
    return FileReader.createReader(options);
  }
}
