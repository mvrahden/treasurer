import { FileSystem } from './FileSystem';
import { FileOptions } from './FileOptions';
import { Path } from './Path';

export class FileSystemSpy implements FileSystem {
    private _existingPaths: Array<Path> = new Array<Path>();

    private _fileOptions: FileOptions;
    private _content: string;
    private _path: Path;

    private _directoriesLog: string = "";
    private _parentDirectoriesLog: string = "";

    writeFile(path: Path, content: string, options: FileOptions): void {
        this._path = path;
        this._content = content;
        this._fileOptions = options;
    }

    public getPath(): Path {
        return this._path;
    }

    public getFileContent(): string {
        return this._content;
    }

    public getFileOptions(): FileOptions {
        return this._fileOptions;
    }

    public getDirectoriesLog(): string {
        return this._directoriesLog;
    }

    public getParentDirectoriesLog(): string {
        return this._parentDirectoriesLog;
    }

    public addExistingPath(directory: Path): void {
        this._existingPaths.push(directory);
    }

    public exists(p: Path): boolean {
        for (let i = 0; i < this._existingPaths.length; i++) {
            if (p.equals(this._existingPaths[i])) {
                return true;
            }
        }
        return false;
    }

    public createDirectoryInParent(directory: string, parent: Path): void {
        this._directoriesLog += directory + ' ';
        this._parentDirectoriesLog += parent.toString() + ' ';
    }

}
