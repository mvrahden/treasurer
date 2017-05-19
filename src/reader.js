let fs = require('fs');
let path = require('path');

let isValidPath = require('./utils/validatePath');

let config = {
  file: {},
  content: {}
}

let readFrom = function(filePath) {
  if(!isValidPath(filePath)) throw "json-path: Please provide a valid path.";
  filePath = path.normalize(filePath);
  config.file = path.parse(filePath);
  return read();
};

  let read = function() {
    let filePath = config.file.dir + path.sep + config.file.base;
    let rawData = fs.readFileSync(filePath).toString();
    let data = convertData(rawData, config.file.ext);
    return data;
  }

    let convertData = function(data, ext) {
      if(ext === '.csv') return convertFromCSV(data);
      else if(ext === '.txt') return convertFromTXT(data);
      else return JSON.parse(data);
    }

      let convertFromCSV = function(data) {
        config.content.header = getHeaderFromCSV(data);
        config.content.data = getDataFromCSV(data);
        return config.content;
      }
        let getHeaderFromCSV = function(data) {
          return data.split('\n')[0].split(',');
        }
        let getDataFromCSV = function(data) {
          let rows = data.split('\n');
          let result = [];

          for(let i=1; i<rows.length; i++) {
            if(rows[i].length > 0) {
              let row = rows[i].split(',').map((value) => {
                if(value === "undefined") return undefined;
                if(value === "null") return null;
                if(value === "true") return true;
                if(value === "false") return false;
                if(!Number.isNaN(Number(value))) return Number(value);
                return value;
              });
              result.push(row);
            }
          }

          return result;
        }

      let convertFromTXT = function(data) {
        config.content.header = getHeaderFromCSV(data);
        config.content.data = getDataFromCSV(data);
        return config.content;
      }
        let getHeaderFromTXT = function(data) {
          return getHeaderFromCSV(data);
        }
        let getDataFromTXT = function(data) {
          return getDataFromCSV(data);
        }

let fileBuilder = {
  readFrom: readFrom
};

module.exports = fileBuilder;