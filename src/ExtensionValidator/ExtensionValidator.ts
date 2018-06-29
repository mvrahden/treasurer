export class ExtensionValidator {
    private _matchingExtensions: Array<string> = new Array<string>();

    public registerExtension(extension: string) {
        this._matchingExtensions.push(extension);
    }

    public isValid(path: string): boolean {
        const actualExtension: string = this.findExtension(path);

        return this.isMatching(actualExtension);
    }

    private isMatching(actualExtension: string) {
        for (const extension of this._matchingExtensions) {
            if (actualExtension === extension) {
                return true;
            }
        }
        return false;
    }

    private findExtension(path: string): string {
        for (let i = path.length - 1; i >= 0; i--) {
            if (path.charAt(i) === '.') {
                return path.substr(i);
            }
        }
        return "";
    }
}
