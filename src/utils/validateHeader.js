'use strict';
/**
 * Validates the elements of a 1D Array of mixed values.
 * Accepts only Strings and/or Numbers.
 * @param {any[]} header - 1D Array of Strings or Numbers.
 * @returns {boolean} State of Validation.
 */
let isValid = function(header) {
  if(header === undefined) return false;
  if(header === null) return false;
  if(!(header instanceof Array)) return false;
  if(header.length === 0) return false;
  for(let i=0; i<header.length; i++) if(!isValidElement(header[i])) return false;
  return true;
}

let isValidElement = function(element) {
  return !(element === undefined) && !(element === null) && !(element instanceof Object);
}

module.exports = isValid;
