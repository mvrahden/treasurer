import { FileReader } from '../../dist/reader';
import { Invalid } from './utils/testingData/invalidTestingData';

describe('Reader', () => {
  it('should throw an error if given an invalid path.', () => {
    Invalid.paths.forEach((path) => {
      expect(() => {
        new FileReader({ sync: true }).readFrom(path as string);
      }).toThrowError(/path/);
    });
  });
});
