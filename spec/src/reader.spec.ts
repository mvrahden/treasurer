import { FileReader } from '../../dist/reader';
import { Invalid } from './utils/testingData/invalidTestingData';
import { logError } from './utils/logger.util';
import { DataSet } from '../../dist/index';

describe('Reader [synchronously]', () => {
  const config = { sync: true };

  it('should throw an error if given an invalid path.', () => {
    Invalid.paths.forEach((path) => {
      expect(() => {
        FileReader.createReader(config).readFrom(path as string);
      }).toThrowError(/path/);
    });
  });
});

describe('Reader [asynchronously]', () => {
  const config = { sync: false };
  let promises = [];

  beforeEach(() => {
    promises = [];
  });

  it('should\'t throw an error synchronously.', (done: Function) => {
    Invalid.paths.forEach((path) => {
      const resolve = (data) => { };
      const reject = (err) => {
        expect(/path/.test(err)).toBe(true);
        return err;
      };
      try {
        const promise = FileReader.createReader(config).readFrom(path as string, resolve, reject);
        promises.push(promise);
      } catch(err) {
        logError('[READER-r.002]: Threw Error synchronously.', err);
      }
    });
    Promise.all(promises).then(() => {
      done();
    });
  });

  it('should throw path-error if given an invalid path.', (done: Function) => {
    Invalid.paths.forEach((path) => {
      const resolve = (data) => { };
      const reject = (err) => {
        expect(/path/.test(err)).toBe(true);
        return err;
      };
      const promise = FileReader.createReader(config).readFrom(path as string, resolve, reject);
      promises.push(promise);
    });

    Promise.all(promises).then(() => {
      done();
    }).catch((err) => {
      logError('[READER-r.001]: failed reading data', err);
      done();
    });
  });
});
