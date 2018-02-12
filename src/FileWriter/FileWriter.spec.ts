import { FileWriter } from './FileWriter';
import { FileSystemSpy } from "../FileSystem/FileSystem.doubles";
import { FileSystem } from "../FileSystem/FileSystem";
import { FileOptionsDummy } from '../FileSystem/FileOptions.doubles';
import { FileOptions } from '../FileSystem/FileOptions';
import { Path } from '../FileSystem/Path';

describe('FileWriter :', () => {
    let fileSystem: FileSystemSpy;
    let sut: FileWriter;

    beforeEach(() => {
        fileSystem = makeFileSystemSpy();
        sut = makeFileCreator(fileSystem);
    });

    const makeFileCreator = (fileSystem: FileSystem): FileWriter => {
        return new FileWriter(fileSystem);
    }

    const makeFileSystemSpy = (): FileSystemSpy => {
        return new FileSystemSpy();
    }

    describe('File creation:', () => {
        beforeEach(() => {
            fileSystem.addExistingPath(new Path("/"));
        });

        it('Fresh instance --> writeTo --> FileSystem should have created file at given path', () => {
            sut.writeTo("/Any/Path/We/Want.lol");

            expectFileSystemHasCreatedFileAtPath("/Any/Path/We/Want.lol");
        });

        it('Content is set --> writeTo --> FileSystem should have created file with given content', () => {
            sut.setContent("This is the content!");

            sut.writeTo("/AnyPath");

            expectFileSystemHasCreatedFileWithContent("This is the content!");
        });

        it('FileOptions are set --> writeTo --> FileSystem should have created file with given options', () => {
            const options: FileOptions = new FileOptionsDummy();
            sut.setOptions(options);

            sut.writeTo("/AnyPath");

            expectFileSystemHasCreatedFileWithOptions(options);
        });

        const expectFileSystemHasCreatedFileAtPath = (expectedPath: string): void => {
            const actual = fileSystem.getPath();
            const expected = new Path(expectedPath);
            const errorMessage = "FileSystem should have created file at path \"" + expected.toString() + "\". Instead it has created at path \"" + actual.toString() + "\"!";

            expect(actual).toEqual(expected, errorMessage);
        }

        const expectFileSystemHasCreatedFileWithContent = (expectedContent: string): void => {
            const actual = fileSystem.getFileContent();
            const expected = expectedContent;
            const errorMessage = "FileSystem should have created file with content \"" + expected + "\". Instead the file has the content \"" + actual + "\"!";

            expect(actual).toBe(expected, errorMessage);
        }

        const expectFileSystemHasCreatedFileWithOptions = (expectedOptions: FileOptions): void => {
            const actual = fileSystem.getFileOptions();
            const expected = expectedOptions;
            const errorMessage = "FileSystem has not received the correct FileOptions!";

            expect(actual).toBe(expected, errorMessage);
        }
    });

    describe('absolute posix path creation:', () => {
        beforeEach(() => {
            fileSystem.addExistingPath(new Path("/"));
        });

        it('Filesystem populated with "/" --> writeTo "/NonExisting" --> FileSystem should create directory "NonExisting"', () => {
            sut.writeTo("/NonExisting/file.adsf");

            expectCreatedDirectoriesLogToBe("NonExisting ");
        });

        it('Filesystem populated with "/" --> writeTo "/NonExisting" --> FileSystem should create directory in "/"', () => {
            sut.writeTo("/NonExisting/file.adsf");
        
            expectParentDirectoriesLogToBe("/ ");
        });

        it('Filesystem populated with "/" and "/This" --> writeTo "/This/NonExisting" --> FileSystem should create directory "NonExisting"', () => {
            fileSystem.addExistingPath(new Path("/This"));

            sut.writeTo("/This/NonExisting/file.adsf");

            expectCreatedDirectoriesLogToBe("NonExisting ");
        });

        it('Filesystem populated with "/" and "/This" --> writeTo "/This/NonExisting" --> FileSystem should create directory in "/This"', () => {
            fileSystem.addExistingPath(new Path("/This"));

            sut.writeTo("/This/NonExisting/file.adsf");

            expectParentDirectoriesLogToBe("/This ");
        });

        it('Filesystem populated with "/" and "/This" --> writeTo "/This/Non/Existing" --> FileSystem should create directories "Non" and "Existing"', () => {
            fileSystem.addExistingPath(new Path("/This"));

            sut.writeTo("/This/Non/Existing/file.adsf");

            expectCreatedDirectoriesLogToBe("Non Existing ");
        });

        it('Filesystem populated with "/" and "/This" --> writeTo "/This/Non/Existing" --> FileSystem should create directories in "/" and "/This"', () => {
            fileSystem.addExistingPath(new Path("/This"));

            sut.writeTo("/This/Non/Existing/file.adsf");

            expectParentDirectoriesLogToBe("/This /This/Non ");
        });
    });

    describe('relative posix path creation:', () => {
        it('Fresh Instance --> writeTo --> should create directories relative to cwd', () => {
            sut.writeTo("./NonExisting/file.adsf");

            expectCreatedDirectoriesLogToBe("NonExisting ");
        });

        // TODO: ROOT Tag austauschen
        // it('Fresh Instance --> writeTo --> should create directories relative to cwd', () => {
        //     sut.writeTo("./NonExisting/file.adsf");

        //     expectParentDirectoriesLogToBe(". ");
        // });
    });

    const expectCreatedDirectoriesLogToBe = (directory: string): void => {
        const actual = fileSystem.getDirectoriesLog();
        const expected = directory;
        const errorMessage = "FileSystem should have created directories \"" + expected + "\", but it has created \"" + actual + "\"!";

        expect(actual).toBe(expected, errorMessage);
    }

    const expectParentDirectoriesLogToBe = (directory: string): void => {
        const actual = fileSystem.getParentDirectoriesLog();
        const expected = directory;
        const errorMessage = "FileSystem should have created in parent directories \"" + expected + "\", but it has created in \"" + actual + "\"!"

        expect(actual).toBe(expected, errorMessage);
    }
});
