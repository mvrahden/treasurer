let fs = require('fs');
let path = require('path');

let isValidPath = require('./utils/validatePath');

let config = {
  file: {},
  content: {}
}

let setPath = function(filePath) {
  if(!isValidPath(filePath)) throw "json-path: Please provide a valid path.";
  filePath = path.normalize(filePath);
  config.file = path.parse(filePath);
  return reader;
};

let read = function() {
  return {};
}

let fileBuilder = {
  setPath: setPath
};

let reader = {
  read: read
};

module.exports = fileBuilder;