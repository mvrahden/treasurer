import { FileWriter } from "./writer";
import { FileReader } from "./reader";
import { WriterOpts } from "./utils/writer-opts";
import { ReaderOpts } from "./utils/reader-opts";


export class Treasurer {

  /**
   * Pre-configures the file writer with given options.
   * @param {WriterOpts} [opts = {sync: false, {encoding: 'utf8'}}] contains several options.
   * @returns file writing facility
   */
  public static fileWriter(opts?: WriterOpts): FileWriter {
    return new FileWriter(opts);
  }

  /**
   * Pre-configures the file reader with given options.
   * @param {WriterOpts} [opts = {sync: false, {endoding: 'utf8'}}] contains several options.
   * @returns file reading facility
   */
  public static fileReader(opts?: ReaderOpts): FileReader {
    return new FileReader(opts);
  }

}
