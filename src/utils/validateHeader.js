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
