const fs = require('fs');
const path = require('path');

const isValidPath = require('./utils/validatePath');

let config = {
  file: {},
  content: {}
}

/**
 * Reads the content of the given file path.
 * @param {String} filePath - String representation of a file path.
 * @returns {Object} dataSet-Object containing the header and the corresponding data.
 */
const readFrom = function(filePath) {
  if(!isValidPath(filePath)) throw "json-path: Please provide a valid path.";
  preparePathConfig(filePath);
  try {
    return read();
  } catch(err) {
    if(/ENOENT/.test(err)) throw "readFrom: No such file or directory. (ENOENT)"
    if(/EACCES/.test(err)) throw "writeTo: Permission denied. (EACCES)"
    if(/ECANCELED/.test(err)) throw "writeTo: Operation canceled. (ECANCELED)"
    throw err;
  }
};

  const preparePathConfig = function(filePath) {
    filePath = path.normalize(filePath);
    config.file = path.parse(filePath);
  }

  const read = function() {
    const filePath = config.file.dir + path.sep + config.file.base;
    const rawData = fs.readFileSync(filePath).toString();
    const data = convertData(rawData, config.file.ext);
    return data;
  }

    const convertData = function(data, ext) {
      if(ext === '.csv') return convertFromCSV(data);
      else if(ext === '.txt') return convertFromTXT(data);
      else return JSON.parse(data);
    }

      const convertFromCSV = function(data) {
        config.content.header = getHeaderFromCSV(data);
        config.content.data = getDataFromCSV(data);
        return config.content;
      }

        const getHeaderFromCSV = function(data) {
          return data.split('\n')[0].split(',').map(mapEachValue);
        }

        const getDataFromCSV = function(data) {
          const rows = data.split('\n');
          let csvData = [];

          for(let i=1; i<rows.length; i++) {
            if(rows[i].length > 0) {
              const row = rows[i].split(',').map(mapEachValue);
              csvData.push(row);
            }
          }
          return csvData;
        }

          const mapEachValue = function(value) {
            if(value === "undefined") return undefined;
            if(value === "null") return null;
            if(value === "true") return true;
            if(value === "false") return false;
            if(value === "NaN") return Number.NaN;
            if(value === "") return '';
            if(!Number.isNaN(Number(value))) return Number(value);
            return value;
          }

      const convertFromTXT = function(data) {
        config.content.header = getHeaderFromCSV(data);
        config.content.data = getDataFromCSV(data);
        return config.content;
      }

        const getHeaderFromTXT = function(data) {
          return getHeaderFromCSV(data);
        }
      
        const getDataFromTXT = function(data) {
          return getDataFromCSV(data);
        }

const fileBuilder = {
  readFrom: readFrom
};

module.exports = fileBuilder;