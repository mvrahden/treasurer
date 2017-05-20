/**
 * Validates the raw structure of the given dataSet.
 * Accepts a 2D Array with at least one row of any data.
 * Does not check types of the rows' elements, e.g. nested structures.
 * @param {Array} dataSet - 2D Array.
 * @returns {boolean} State of Validation.
 */
let isValid = function(dataSet) {
  if(!isValidArray(dataSet)) return false;
  if(!areValidRows(dataSet)) return false;
  return true;
}

  let isValidArray = function(dataSet) {
    if(dataSet === undefined) return false;
    if(dataSet === null) return false;
    if(!(dataSet instanceof Array)) return false;
    if(dataSet.length === 0) return false;
    return true;
  }

  let areValidRows = function(dataSet) {
    for(let i=0; i<dataSet.length; i++) {
      if(!isValidArray(dataSet[i])) return false;
    }
    return true;
  }

module.exports = isValid;