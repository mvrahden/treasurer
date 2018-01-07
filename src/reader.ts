import * as fs from 'fs';
import * as path from 'path';
import { ParsedPath } from 'path';

import { File } from './utils/file';
import { FileValidator } from './utils/file-validator';
import { WriterOpts } from './utils/writer-opts';
import { ReaderOpts } from './utils/reader-opts';

export class FileReader {
  private file: ParsedPath = null;
  options: ReaderOpts;

  constructor(options?: ReaderOpts) {
    this.options = options ? options : { fileSystem: { encoding: 'utf8' } };
  }

  /**
   * Reads the content of the given file path.
   * @param {String} filePath - String representation of a file path.
   * @returns {File} dataSet-Object containing the header and the corresponding data.
   * @throws {Error} if input doesn't meet the accepted scope or if the writing process was aborted.
   */
  public readFrom(filePath): File {
    if (!FileValidator.isValidPath(filePath)) { throw Error('readFrom: Please provide a valid path.'); }
    this.preparePathConfig(filePath);
    try {
      return this.read();
    } catch (err) {
      this.catchError(err);
    }
  }

  private catchError(err: any) {
    if (/ENOENT/.test(err)) { throw Error('readFrom: No such file or directory. (ENOENT)'); }
    if (/EACCES/.test(err)) { throw Error('readFrom: Permission denied. (EACCES)'); }
    if (/ECANCELED/.test(err)) { throw Error('readFrom: Operation canceled. (ECANCELED)'); }
    throw err;
  }

  private preparePathConfig(filePath) {
    filePath = path.normalize(filePath);
    this.file = path.parse(filePath);
  }

  private read(): File {
    const filePath = this.createFilePath();
    const rawData = fs.readFileSync(filePath, this.options.fileSystem);
    const data = this.convertData(rawData);
    return data;
  }

  private createFilePath(): string {
    if (this.file.dir === '') { return '.' + path.sep + this.file.base; }
    else { return this.file.dir + path.sep + this.file.base; }
  }

  private convertData(data): (any | File) {
    if (this.file.ext === '.csv') { return this.convertFromCSV(data); }
    else if (this.file.ext === '.txt') { return this.convertFromTXT(data); }
    else {
      return JSON.parse(data, (key, value) => {
        if (value === 'NaN') { return Number.NaN; }
        else { return value; }
      });
    }
  }

  private convertFromCSV(data): File {
    const content = { header: null, data: null };
    content.header = FileReader.getHeaderFromCSV(data);
    content.data = FileReader.getDataFromCSV(data);
    return content;
  }

  private static getHeaderFromCSV(data): any[] {
    return data.split('\n')[0].split(',').map(FileReader.mapEachValue);
  }

  private static getDataFromCSV(data): any[] {
    const rows = data.split('\n');
    const csvData = [];

    for (let i = 1; i < rows.length; i++) {
      if (rows[i].length > 0) {
        const row = rows[i].split(',').map(FileReader.mapEachValue);
        csvData.push(row);
      }
    }
    return csvData;
  }

  private convertFromTXT(data): File {
    const content = { header: null, data: null };
    content.header = FileReader.getHeaderFromTXT(data);
    content.data = FileReader.getDataFromTXT(data);
    return content;
  }

  private static getHeaderFromTXT(data): any[] {
    return FileReader.getHeaderFromCSV(data);
  }

  private static getDataFromTXT(data): any[] {
    return FileReader.getDataFromCSV(data);
  }

  private static mapEachValue(value) {
    if (value === 'undefined') { return undefined; }
    if (value === 'null') { return null; }
    if (value === 'true') { return true; }
    if (value === 'false') { return false; }
    if (value === 'NaN') { return Number.NaN; }
    if (/^"(.*(?="$))"$/.test(value)) { return value.slice(1, -1); }
    if (!Number.isNaN(Number(value))) { return Number(value); }
    return value;
  }

}
