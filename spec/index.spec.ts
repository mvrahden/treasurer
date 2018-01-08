import * as fs from 'fs';
import * as child_process from 'child_process';
const execSync = child_process.execSync;
import * as _ from 'lodash';

import { Valid } from './utils/testingData/validTestingData';

import { Treasurer, DataSet, ReaderConfig, WriterConfig } from '../dist/index';
import { DatasetValidator } from '../dist/utilities';

const cleanTestDirectory = () => {
  execSync('rm -rf ./test/');
};

const writeData = (content: DataSet, path: string) => {
  Treasurer
    .fileWriter({ sync: true })
    .setHeader(content.header)
    .setData(content.data)
    .writeTo(path);
};

describe('Treasurer:', () => {
  describe('Writer', () => {
    beforeEach(() => {
      cleanTestDirectory();
    });

    it('should async create the file even in deeply nested, non-existing directories.', (done: Function) => {
      const promises = [];

      Valid.fileContents.forEach((content: any) => {
        Valid.paths.forEach((path: string) => {
          promises.push(Treasurer
            .fileWriter({sync: false})
            .setHeader(content.header)
            .setData(content.data)
            .writeTo(path, () => {
              const pathExists = fs.existsSync(path);
              expect(pathExists).toBe(true);
            }));
        });
      });

      Promise.all(promises).then(() => {
        done();
      });
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
          expect(fs.existsSync(path)).toBe(true);
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
        writeData(content, path);
      });
    });

    it('should be able to read the files content.', () => {
      Valid.fileContents.forEach((content: DataSet) => {
        Valid.paths.forEach((path: string) => {
          expect(fs.existsSync(path)).toBe(true);
          expect(() => {
            const config: ReaderConfig = { sync: true };
            Treasurer.fileReader(config).readFrom(path);
          }).not.toThrow();
        });
      });
    });
  });

  describe('Reader', () => {
    it('should be able to synchronously reconstruct the (cleaned) data that was written by reading the files, e.g. Numbers formatted as Strings.', () => {
      Valid.fileContents.forEach((content: DataSet) => {
        Valid.paths.forEach((path: string) => {
          writeData(content, path);
          expect(fs.existsSync(path)).toBe(true);
          expect((() => {
            const res = Treasurer.fileReader({sync: true}).readFrom(path);
            content.data = DatasetValidator.cleanData(content.data);
            return _.isEqual(res, content);
          })()).toBe(true);
        });
      });
    });

    it('should be able to async reconstruct the (cleaned) data that was written by reading the files, e.g. Numbers formatted as Strings.', (done: Function) => {
      const promises = [];

      /*
       * reader Facility to be injected in ASYNC write-read-Chain
       */
      const reader = (path: string) => {
        expect(fs.existsSync(path)).toBe(true);
        Treasurer.fileReader({ sync: false }).readFrom(path, (res: DataSet) => {
          const content = {header: null, data: null};
          content.data = DatasetValidator.cleanData(content.data);
          const isEqual = _.isEqual(res, content);
          expect(isEqual).toBe(true);
        }, (err) => { });
      };

      /* 
       * Loop all content and paths. Create a ASYNC write job with and appends the reader-Facility to ensure that: DataSet (resp. File) is written in order to be read.
       */
      Valid.fileContents.forEach((content: DataSet) => {
        Valid.paths.forEach((path: string) => {
          promises.push(
            Treasurer.fileWriter({ sync: false }).setHeader(content.header).setData(content.data).writeTo(path, () => {
              reader(path);
            }, () => {}));
        });
      });

      /*
       * Resolve all Write-Read-Chainings.
       */
      Promise.all(promises).then(() => {
        done();
      });
    });
  });

  afterEach(() => {
    cleanTestDirectory();
  });
});
