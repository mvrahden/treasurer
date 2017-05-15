
let isValid = function(dataSet) {
  if(!isValidArray(dataSet)) return false;
  if(!areValidRows(dataSet)) return false;
  return true;
}

let areValidRows = function(dataSet) {
  for(let i=0; i<dataSet.length; i++) {
    if(!isValidArray(dataSet[i])) return false;
    if(!areValidElements(dataSet[i])) return false;
  }
  return true;
}

let areValidElements = function(row) {
  for(let i=0; i<row.length; i++) {
    if(!isValidElement(row[i])) return false;
  }
  return true;
}

let isValidElement = function(element) {
  return !(element === undefined) && !(element === null) && !(element instanceof Object);
}

let isValidArray = function(dataSet) {
  if(dataSet === undefined) return false;
  if(dataSet === null) return false;
  if(!(dataSet instanceof Array)) return false;
  if(dataSet.length === 0) return false;
  return true;
}

module.exports = isValid;