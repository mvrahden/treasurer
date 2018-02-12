import { FileSystem } from '../FileSystem/FileSystem';
import { FileOptions } from '../FileSystem/FileOptions';
import { Path } from '../FileSystem/Path';

export class FileWriter {
    private _options: FileOptions;
    private _content: string;
    private _fileSystem: FileSystem;
    
    constructor(fileSystem: FileSystem) {
        this._fileSystem = fileSystem;
    }

    public setContent(content: string): void {
        this._content = content;
    }

    public setOptions(options: FileOptions): void {
        this._options = options;
    }

    public writeTo(path: string): void {
        const p = new Path(path);

        this.createDirectoryRecursively(p.parent());

        this.writeFileTo(p);
    }

    private writeFileTo(path: Path) {
        this._fileSystem.writeFile(path, this._content, this._options);
    }

    private createDirectoryRecursively(p: Path): void {
        if(!p.isRoot() && this.doesNotExist(p)) { 
            this.createDirectoryRecursively(p.parent());
            this.createDirectory(p);
        }
    }

    private createDirectory(p: Path) {
        this._fileSystem.createDirectoryInParent(p.last(), p.parent());
    }

    private doesNotExist(p: Path) {
        return !this._fileSystem.exists(p);
    }
}
