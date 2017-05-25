'use strict';
let getExtension = require('./getExtension');

/**
 * Validates the path.
 * Accepts only a String representation of a file path - including the extension.
 * @param {String} path - String representation of a file path.
 * @returns {boolean} State of Validation.
 */
let isValid = function(path) {
  if(path === undefined) return false;
  if(path === null) return false;
  if(!(typeof path === 'string')) return false;
  if(!includesExtension(path)) return false;
  return true;
};

  let includesExtension = function(path) {
    return getExtension(path) !== 'invalid';
  };

module.exports = isValid;
