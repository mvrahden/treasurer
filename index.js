'use strict';
let writer = require('./src/writer');
let reader = require('./src/reader');

module.exports = {
  setHeader: writer.setHeader,
  readFrom: reader.readFrom
};
