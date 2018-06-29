import { FileOptions } from '../FileSystem/FileOptions';

export class NodeDefaultFileOptions implements FileOptions {
    public encoding: string = 'utf8';
    public mode: number = 0o666;
    public flag: string = 'w';
}
