let fs = require('fs');
let path = require('path');

let isValidData = require('./utils/validateData');
let isValidHeader = require('./utils/validateHeader');
let isValidPath = require('./utils/validatePath');
let getExtension = require('./utils/getExtension');

let config = {
  file: {},
  content: {}
}

let setHeader = function(header) {
  if(!isValidHeader(header)) throw "json-header: Accepts only 1-d Arrays with valid Strings and Numbers.";
  config.content.header = header;
  return dataSetter;
};

let setData = function(data) {
  if(!isValidData(data)) throw "json-data: Accepts only 2-d Arrays with Strings, Numbers or Booleans.";
  config.content.data = data;
  return pathSetter;
};

let writeTo = function(filePath) {
  if(!isValidPath(filePath)) throw "json-path: Please provide a valid path.";
  filePath = path.normalize(filePath);
  config.file = path.parse(filePath);
  write();
};

  let write = function() {
    let filePath = config.file.dir + path.sep + config.file.base;
    let data = convertData(config.content.header, config.content.data, config.file.ext);
    createNonexistingDirectories();
    fs.writeFileSync(filePath, data);
  }

    let convertData = function(header, data, ext) {
      if(ext === '.csv') return convertToCSV(header, data);
      else if(ext === '.txt') return convertToTXT(header, data);
      else return JSON.stringify({header: header, data: data});
    }

      let convertToCSV = function(header, data) {
        let output = header.join(',') + '\n';
        data.forEach((row) => {
          output += row.join(',') + '\n';
        });
        return output;
      }

      let convertToTXT = function(header, data) {
        return convertToCSV(header, data);
      }

    let createNonexistingDirectories = function() {
      config.file.dir.split(path.sep).reduce((dir, segment) => {
        createUnexisting(dir);
        dir = dir + path.sep + segment;
        createUnexisting(dir);
        return dir;
      });
    }

      let createUnexisting = function(dir) {
        if(!fs.existsSync(dir)) {
          fs.mkdirSync(dir);
        }
      }

let fileBuilder = {
  setHeader: setHeader
};

let dataSetter = {
  setData: setData
};

let pathSetter = {
  writeTo: writeTo
};

module.exports = fileBuilder;