import { ReaderConfig, DataSet, DatasetValidator } from './utilities';
import { Reader } from './reader/reader';
import { SyncReader } from './reader/sync.reader';
import { AsyncReader } from './reader/async.reader';

export class FileReader {

  public static createReader(options?: ReaderConfig): Reader {
    options = options ? options : { sync: false, fileSystem: { encoding: 'utf8' } };

    if(options.sync) {
      return new SyncReader(options);  
    } else {
      return new AsyncReader(options);
    }
  }

}
