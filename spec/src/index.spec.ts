import * as fs from 'fs';
import * as os from 'os';
import * as child_process from 'child_process';
const execSync = child_process.execSync;
import * as _ from 'lodash';

import { Valid } from './utils/testingData/validTestingData';
import { logError } from './utils/logger.util';

import { Treasurer, DataSet, ReaderConfig, WriterConfig } from '../../dist/index';
import { DatasetValidator } from '../../dist/utilities';

const cleanTestDirectory = (): void => {
  execSync('rm -rf ./test/');
};

const specifyPathToOS = (path: string): string => {
  if (/Windows/.test(os.type())) { return path.replace(/\//g, '\\'); }
  else { return path.replace(/\\/g, '/'); }
};


const expectPathToExist = (path: string): void => {
  path = specifyPathToOS(path);
  const pathExists = fs.existsSync(path);
  if (!pathExists) { logError('[PATH]: doesn\'t exist', path); }
  expect(pathExists).toBe(true);
};

const writeDataSync = (content: DataSet, path: string): void => {
  Treasurer
    .fileWriter({ sync: true })
    .setHeader(content.header)
    .setData(content.data)
    .writeTo(path);
};

describe('Treasurer [synchronously]:', () => {
  describe('Writer', () => {
    beforeEach(() => {
      cleanTestDirectory();
    });

    it('should synchronously create the file even in deeply nested, non-existing directories.', () => {
      Valid.fileContents.forEach((content: DataSet) => {
        Valid.paths.forEach((path: string) => {
          expect(() => {
            const config: WriterConfig = { sync: true };
            Treasurer
              .fileWriter(config)
              .setHeader(content.header)
              .setData(content.data)
              .writeTo(path);
          }).not.toThrowError();

          expectPathToExist(path);
        });
      });
    });

    afterAll(() => {
      cleanTestDirectory();
    });
  });


  describe('Reader', () => {
    beforeEach(() => {
      const content = Valid.fileContents[0];
      Valid.paths.forEach((path: string) => {
        writeDataSync(content, path);
      });
    });

    it('should be able to read the files content.', () => {
      Valid.fileContents.forEach((content: DataSet) => {
        Valid.paths.forEach((path: string) => {
          expectPathToExist(path);
          expect(() => {
            const config: ReaderConfig = { sync: true };
            Treasurer.fileReader(config).readFrom(path);
          }).not.toThrow();
        });
      });
    });

    it('should be able to synchronously reconstruct the (cleaned) data that was written by reading the files, e.g. Numbers formatted as Strings.', () => {
      Valid.fileContents.forEach((content: DataSet) => {
        Valid.paths.forEach((path: string) => {
          writeDataSync(content, path);
          expectPathToExist(path);

          const config: ReaderConfig = { sync: true };
          const res = Treasurer.fileReader(config).readFrom(path);
          content.data = DatasetValidator.cleanData(content.data);
          const expectedEquality = _.isEqual(res, content);
          expect(expectedEquality).toBe(true);
        });
      });
    });

    afterEach(() => {
      cleanTestDirectory();
    });
  });
});

describe('Treasurer [asynchronously]:', () => {
  describe('Writer', () => {
    beforeEach(() => {
      cleanTestDirectory();
    });

    it('should async create the file even in deeply nested, non-existing directories.', (done: Function) => {
      const promises = [];

      Valid.fileContents.forEach((content: any) => {
        Valid.paths.forEach((path: string) => {
          const config = { sync: false };
          promises.push(Treasurer
            .fileWriter(config)
            .setHeader(content.header)
            .setData(content.data)
            .writeTo(path, () => {
              expectPathToExist(path);
            }));
        });
      });

      Promise.all(promises).then(() => {
        done();
      }).catch((err) => {
        logError('[WRITER-t.003] Failed with following message: ', err);
        done();
      });
    });

    afterAll(() => {
      cleanTestDirectory();
    });
  });

  
  describe('Reader', () => {
  
    /**
     * reader Facility to be injected in ASYNC write-read-Chain
     */
    const asyncRead = (expected: DataSet, path: string, resolve?: any, reject?: any) => {
      expectPathToExist(path);
      const res = Treasurer.fileReader({ sync: false }).readFrom(path, resolve, reject);
      // expected.data = DatasetValidator.cleanData(expected.data);
      // const expectedEquality = _.isEqual(res, expected);
      // expect(expectedEquality).toBe(true);
      return res;
    };

    let promises = [];

    beforeEach(() => {
      promises = [];
      const content = Valid.fileContents[0];
      Valid.paths.forEach((path: string) => {
        writeDataSync(content, path);
      });
    });

    it('shouldn\'t throw errors when no resolve function given.', (done: Function) => {
      /** 
       * Loop all content and paths. Create a ASYNC write job with and appends the reader-Facility to
       * ensure that: DataSet (resp. File) is written in order to be read.
       */
      Valid.fileContents.forEach((content: DataSet) => {
        Valid.paths.forEach((path: string) => {
          const config = { sync: true };
          Treasurer.fileWriter(config).setHeader(content.header).setData(content.data).writeTo(path);
          promises.push(asyncRead(content, path));
          promises.push(asyncRead(content, path, null, null));
          promises.push(asyncRead(content, path, undefined, null));
          promises.push(asyncRead(content, path, null, undefined));
          promises.push(asyncRead(content, path, '', null));
          promises.push(asyncRead(content, path, null, ''));
          promises.push(asyncRead(content, path, 1, null));
          promises.push(asyncRead(content, path, null, 1));
          promises.push(asyncRead(content, path, false, null));
          promises.push(asyncRead(content, path, null, false));
        });
      });

      /**
       * Resolve Write-Read-Chain.
       */
      Promise.all(promises).then(() => {
        done();
      }).catch((err) => {
        logError('[READER-t.002] Failed with following message: ', err);
        done();
      });
    });

    it('should be able to async reconstruct the (cleaned) data that was written by reading the files, e.g. Numbers formatted as Strings.', (done: Function) => {
      const asyncReadAndCheckEquality = (path: string, expected: DataSet) => {
        return asyncRead(expected, path, (res: DataSet) => {
          expected.data = DatasetValidator.cleanData(expected.data);
          const expectedEquality = _.isEqual(res, expected);
          return res;
        }, (err) => {
          logError('[READER-t.003] Reader failed to read.\npath: ' + path, err);
        });
      };

      /** 
       * Loop all content and paths. Create a ASYNC write job with and appends the reader-Facility to ensure that: DataSet (resp. File) is written in order to be read.
       */
      Valid.fileContents.forEach((content: DataSet) => {
        Valid.paths.forEach((path: string) => {
          const config = { sync: true };
          Treasurer.fileWriter(config).setHeader(content.header).setData(content.data).writeTo(path);
          promises.push(asyncReadAndCheckEquality(path, content));
        });
      });

      /**
       * Resolve Write-Read-Chain.
       */
      Promise.all(promises).then(() => {
        done();
      }).catch((err) => {
        logError('[READER-t.003] Failed with following message: ', err);
        done();
      });
    });

    afterEach(() => {
      cleanTestDirectory();
    });
  });
});

/**
 * - Create new tests for BLANK LINES in files for READER.
 * - WRITE-READ-Chain Testing
 * - ASYNC/AWAIT Testing
 * - Restrucutre tests; seperate read & write & suite (cascades of workflows)
 */
