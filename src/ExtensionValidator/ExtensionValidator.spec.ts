import { ExtensionValidator } from './ExtensionValidator';

describe('ExtensionValidator :', () => {
    const dir: string = "This/Is/A/Valid/Path";
    const csv: string = '.csv';
    const tsv: string = '.tsv';
    const json: string = '.json';

    it('Registered extensions --> Should validate registered extension', () => {
        const sut: ExtensionValidator = makePathValidator();
        populateExtensions(sut);

        expectValidatesRegisteredExtensions(sut);
    });

    it('Registered extensions --> Should invalidate not registered extension', () => {
        const sut: ExtensionValidator = makePathValidator();
        populateExtensions(sut);

        expectInvalidatesNotRegisteredExtensions(sut);
    });

    const makePathValidator = (): ExtensionValidator => {
        return new ExtensionValidator();
    }

    const expectValidatesExtension = (sut: ExtensionValidator, extension: string) => {
        const actual = sut.isValid(extension);
        const expected = true;
        const errorMessage = "PathValidator should have validated the " + extension + " extension, but it has not!";
        expect(actual).toBe(expected, errorMessage);   
    }

    const expectInvalidatesNotRegisteredExtensions = (sut: ExtensionValidator) => {
        const actual = sut.isValid(dir + ".invalid");
        const expected = false;
        const errorMessage = "PathValidator should have invalidated the incorrect extension, but it has not!";
        expect(actual).toBe(expected, errorMessage);
    }

    const expectValidatesRegisteredExtensions = (sut: ExtensionValidator) => {
        expectValidatesExtension(sut, csv);
        expectValidatesExtension(sut, tsv);
        expectValidatesExtension(sut, json);
    }

    const populateExtensions = (sut: ExtensionValidator) => {
        sut.registerExtension(tsv);
        sut.registerExtension(json);
        sut.registerExtension(csv);
    }
});