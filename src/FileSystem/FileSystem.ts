import { FileOptions } from './FileOptions';
import { Path } from './Path';

export interface FileSystem {
    writeFile(path: Path, content: string, options: FileOptions): void;
    createDirectoryInParent(directory: string, parent: Path): void;
    exists(path: Path): void;
}