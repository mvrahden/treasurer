/**
 * Validates the elements of the given 2D-Array dataSet.
 * Accepts elements of type Number (1, 1.234, NaN), String ('abc', '') and boolean (true, false).
 * @param {any[][]} dataSet - 2D Array of mixed (Number, String, boolean) values.
 * @returns {boolean} State of Validation.
 */
let isValid = function(dataSet) {
  if(!containsValidRows(dataSet)) return false;
  return true;
}

  let containsValidRows = function(dataSet) {
    for(let i=0; i<dataSet.length; i++) {
      if(!containsValidElements(dataSet[i])) return false;
    }
    return true;
  }

    let containsValidElements = function(row) {
      for(let i=0; i<row.length; i++) {
        if(!isValidElement(row[i])) return false;
      }
      return true;
    }

      let isValidElement = function(element) {
        return !(element === undefined) && !(element === null) && !(element instanceof Function) && !(element instanceof Object);
      }

module.exports = isValid;