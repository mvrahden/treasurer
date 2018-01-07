import { FileReader } from '../dist/reader';
import { Invalid } from './utils/testingData/invalidTestingData';

describe('Reader', () => {
  it('should throw an error if given a false path.', () => {
    Invalid.paths.forEach((path)=> {
      expect(() => {
        new FileReader().readFrom(path);
      }).toThrowError(/path/);
    });
  });
});
