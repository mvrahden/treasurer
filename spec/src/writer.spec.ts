import { FileWriter } from '../../dist/writer';
import { Valid } from './utils/testingData/validTestingData';
import { Invalid } from './utils/testingData/invalidTestingData';

import * as childProcess from 'child_process';
import { logError } from './utils/logger.util';
const execSync = childProcess.execSync;

const cleanTestDirectory = () => {
  execSync('rm -rf ./test/');
};

describe('Writer [synchronously]', () => {
  const config = { sync: true }

  it('should throw an error if given a false path.', () => {
    const someValidContent = Valid.fileContents[0];
    Invalid.paths.forEach((path: string) => {
      expect(() => {
        FileWriter.createWriter(config)
          .setHeader(someValidContent.header)
          .setData(someValidContent.data)
          .writeTo(path);
      }).toThrowError(/path/);
    });
  });

  it('should throw an error if given invalid contents.', () => {
    Invalid.fileContents.forEach((invalidContent) => {
      Valid.paths.forEach((path) => {
        expect(() => {
          FileWriter.createWriter(config)
            .setHeader(invalidContent.header)
            .setData(invalidContent.data)
            .writeTo(path);
        }).toThrowError(/(setHeader|setData)/);
      });
    });
  });
});

describe('Writer [asynchronously]', () => {
  const config = { sync: false };
  let promises = [];

  beforeEach(() => {
    promises = [];
  });


  it('should\'t throw an error if given valid data but no resolve function.', (done: Function) => {
    Valid.fileContents.forEach((content) => {
      Valid.paths.forEach((path) => {
        promises.push(FileWriter.createWriter(config).setHeader(content.header).setData(content.data).writeTo(path));
        promises.push(FileWriter.createWriter(config).setHeader(content.header).setData(content.data).writeTo(path, null, null));
        promises.push(FileWriter.createWriter(config).setHeader(content.header).setData(content.data).writeTo(path, () => { }, null));
        promises.push(FileWriter.createWriter(config).setHeader(content.header).setData(content.data).writeTo(path, null, () => { }));
        promises.push(FileWriter.createWriter(config).setHeader(content.header).setData(content.data).writeTo(path, undefined, () => { }));
        promises.push(FileWriter.createWriter(config).setHeader(content.header).setData(content.data).writeTo(path, undefined, undefined));
      });
    });

    Promise.all(promises).then(() => {
      done();
    }).catch((err) => {
      logError('[WRITER-w.001]: failed writing data', err);
      done();
    });
  });

  it('should\'t throw an error synchronously.', (done: Function) => {
    const resolve = () => { };
    const reject = (err) => {
      expect(/path/.test(err)).toBe(true);
      return err;
    };

    Valid.fileContents.forEach((content) => {
      Invalid.paths.forEach((path) => {
        try {
          promises.push(FileWriter.createWriter(config)
            .setHeader(content.header)
            .setData(content.data)
            .writeTo(path as string, resolve, reject));
        } catch(err) {
          logError('[WRITER-w.003]: Threw Error synchronously.', err);
        }
      });
    });

    Promise.all(promises).then(() => {
      done();
    }).catch((err) => {
      logError('[WRITER-w.002]: failed writing data.', err);
      done();
    });
  });

  afterAll(() => {
    cleanTestDirectory();
  });
});
