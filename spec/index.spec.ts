import * as fs from 'fs';
import * as child_process from 'child_process';
const execSync = child_process.execSync;

import * as _ from 'lodash';

import { Treasurer } from '../dist/index';
import { FileValidator } from '../dist/utils/file-validator';
import { Valid } from './utils/testingData/validTestingData';
import { File } from '../dist/utils/file';
import { WriterOpts } from '../dist/utils/writer-opts';

const cleanTestDirectory = () => {
  execSync('rm -rf ./test/');
};

const writeAnyValidData = (content: any, path: string) => {
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

    it('should async create the file even in deeply nested, non-existing directories.', () => {
      Valid.fileContents.forEach((content: File) => {
        Valid.paths.forEach(async (path: string) => {
          await expect(async () => {
            await Treasurer
              .fileWriter()
              .setHeader(content.header)
              .setData(content.data)
              .writeTo(path);
          }).not.toThrowError();
          expect(fs.existsSync(path)).toBe(true);
        });
      });
    });

    it('should synchronously create the file even in deeply nested, non-existing directories.', () => {
      Valid.fileContents.forEach((content: File) => {
        Valid.paths.forEach((path: string) => {
          expect(() => {
            const opts: WriterOpts = { sync: true };
            Treasurer
              .fileWriter(opts)
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
    beforeAll(() => {
      const content = Valid.fileContents[0];
      Valid.paths.forEach((path: string) => {
        writeAnyValidData(content, path);
      });
    });

    it('should be able to read the files content.', () => {
      Valid.fileContents.forEach((content: File) => {
        Valid.paths.forEach((path: string) => {
          expect(fs.existsSync(path)).toBe(true);
          expect(() => {
            Treasurer
              .fileReader()
              .readFrom(path);
          }).not.toThrow();
        });
      });
    });
  });

  describe('Reader', () => {
    it('should be able to reconstruct the (cleaned) data that was written by reading the files, e.g. Numbers formatted as Strings.', () => {
      Valid.fileContents.forEach((content: File) => {
        Valid.paths.forEach((path: string) => {
          writeAnyValidData(content, path);
          expect(fs.existsSync(path)).toBe(true);
          expect((() => {
            const res = Treasurer.fileReader().readFrom(path);
            content.data = FileValidator.cleanData(content.data);
            return _.isEqual(res, content);
          })()).toBe(true);
        });
      });
    });
  });

  afterAll(() => {
    cleanTestDirectory();
  });
});
