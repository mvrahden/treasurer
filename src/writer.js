'use strict';
const fs = require('fs');
const path = require('path');

const isValidDataStructure = require('./utils/validateDataStructure');
const cleanData = require('./utils/cleanData');
const isValidData = require('./utils/validateData');
const isValidHeader = require('./utils/validateHeader');
const isValidPath = require('./utils/validatePath');

let config = {
  file: {},
  content: {}
};

/**
 * Captures the header.
 * @param {Array} header - 1D Array of Strings and/or Numbers.
 * @returns {Function} setData.
 * @throws {Error} if input doesn't meet the accepted scope.
 */
const setHeader = function(header) {
  if(!isValidHeader(header)) throw Error('setHeader: Accepts only 1-d Arrays with valid Strings and Numbers.');
  config.content.header = header;
  return dataSetter;
};

/**
 * Captures the data.
 * Accepts Numbers (1, 1.234, NaN), Strings ('abc', ''), booleans (true, false) and undefined & null.
 * Transforms undefined and null into empty Strings.
 * @param {Array} data - 2D Array of mixed values.
 * @returns {Function} writeTo.
 * @throws {Error} if input doesn't meet the accepted scope.
 */
const setData = function(data) {
  if(!isValidDataStructure(data)) throw Error('setData: accepts only 2-d Arrays.');
  data = cleanData(data);
  if(!isValidData(data)) throw Error('setData: accepts only 2-d Arrays with Strings, Numbers and/or Booleans.');
  config.content.data = data;
  return pathSetter;
};

/**
 * Captures the file path and writes the given content to the file.
 * @param {String} filePath - String representation of the file path.
 * @returns {void}
 * @throws {Error} if input doesn't meet the accepted scope or if the writing process was aborted.
 */
const writeTo = function(filePath) {
  if(!isValidPath(filePath)) throw Error('writeTo: Please provide a valid path.');
  filePath = path.normalize(filePath);
  config.file = path.parse(filePath);
  try {
    write();
  } catch(err) {
    if(/ENOENT/.test(err)) throw Error('writeTo: No such file or directory. (ENOENT)');
    if(/EACCES/.test(err)) throw Error('writeTo: Permission denied. (EACCES)');
    if(/ECANCELED/.test(err)) throw Error('writeTo: Operation canceled. (ECANCELED)');
    throw err;
  }
};

  const write = function() {
    const filePath = createFilePath();
    const data = convertData(config.content.header, config.content.data, config.file.ext);
    createNonexistingDirectories();
    fs.writeFileSync(filePath, data);
  };

    const createFilePath = function() {
      if(config.file.dir === '') return '.' + path.sep + config.file.base;
      else return config.file.dir + path.sep + config.file.base;
    };

    const convertData = function(header, data, ext) {
      if(ext === '.csv') return convertToCSV(header, data);
      else if(ext === '.txt') return convertToTXT(header, data);
      else return JSON.stringify({header: header, data: data}, (key, value) => {
        if(Number.isNaN(value)) return 'NaN';
        return value;
      });
    };

      const convertToCSV = function(header, data) {
        let outputString = header.join(',') + '\n';
        data.forEach((row) => {
          outputString += row.map(mapEscapeStringValues).join(',') + '\n';
        });
        return outputString;
      };

        const mapEscapeStringValues = function(value) {
          if(typeof value === 'string' || value instanceof String) {
            return ('"'+value+'"');
          }
          return value;
        };

      const convertToTXT = function(header, data) {
        return convertToCSV(header, data);
      };

    const createNonexistingDirectories = function() {
      config.file.dir.split(path.sep).reduce((dir, segment) => {
        createUnexisting(dir);
        dir = dir + path.sep + segment;
        createUnexisting(dir);
        return dir;
      });
    };

      const createUnexisting = function(dir) {
        if(!fs.existsSync(dir)) {
          fs.mkdirSync(dir);
        }
      };

const fileBuilder = {
  setHeader: setHeader
};

const dataSetter = {
  setData: setData
};

const pathSetter = {
  writeTo: writeTo
};

module.exports = fileBuilder;
