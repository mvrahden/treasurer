import { FileWriter } from '../dist/writer';
import { Valid } from './utils/testingData/validTestingData';
import { Invalid } from './utils/testingData/invalidTestingData';

import * as childProcess from 'child_process';
const execSync = childProcess.execSync;

const cleanTestDirectory = () => {
  execSync('rm -rf ./test/');
};

describe('Writer', () => {

  it('should throw an error if given a false path.', () => {
    const someValidContent = Valid.fileContents[0];
    Invalid.paths.forEach((path: string) => {
      expect(() => {
        new FileWriter({ sync: true })
          .setHeader(someValidContent.header)
          .setData(someValidContent.data)
          .writeTo(path);
      }).toThrowError(/path/);
    });
  });

  it('should throw an error if given invalid contents.', () => {
    Invalid.fileContents.forEach((content) => {
      Valid.paths.forEach((path) => {
        expect(() => {
          new FileWriter({ sync: true })
            .setHeader(content.header)
            .setData(content.data)
            .writeTo(path);
        }).toThrowError(/(setHeader|setData)/);
      });
    });
  });

  afterAll(() => {
    cleanTestDirectory();
  });
});
