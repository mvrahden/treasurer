export class Path {

    private _path: string;
    private readonly _delimiter = '/';
    private readonly _root = '<root>';
    private readonly _invalid = '<invalid>';


    constructor(path: string) {
        this._path = (typeof path === 'string') ? this._root + path : this._invalid;
    }

    private getSegments(): Array<string> {
        return this._path.split(this._delimiter);
    }

    public isRoot(): boolean {
        return this.getSegments().length === 1;
    }

    public parent(): Path {
        const search = this._delimiter + this.last();
        const parent = this._path.replace(search, '');

        return new Path(this.untag(parent));
    }

    private untag(s: string): string {
        return s.replace(this._root, '');
    }

    public last(): string {
        const segments = this.getSegments();
        return segments[segments.length - 1];
    }

    public toString(): string {
        if (this.isRoot()) { return this._delimiter; }
        return this.untag(this._path);
    }

    public equals(p: Path): boolean {
        return this._path === p._path;
    }

}
