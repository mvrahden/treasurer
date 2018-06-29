import { FileSystem } from '../FileSystem/FileSystem';
import { FileOptions } from '../FileSystem/FileOptions';
import * as fs from 'fs';
import * as nodePath from 'path';
import { Path } from '../FileSystem/Path';



export class SynchronousNodeFileSystem implements FileSystem {

    writeFile(p: Path, content: string, options: FileOptions): void {
        fs.writeFileSync(p.toString(), content, options);
    }

    createDirectoryInParent(directory: string, parent: Path): void {
        const path = parent.toString() + nodePath.delimiter + directory;
        fs.mkdirSync(path);
    }

    exists(path: Path): boolean {
        return fs.existsSync(path.toString());
    }
}
