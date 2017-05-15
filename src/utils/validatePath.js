let getExtension = require('./getExtension');

let isValid = function(path) {
  if(path === undefined) return false;
  if(path === null) return false;
  if(!(typeof path === "string")) return false;
  if(!includesExtension(path)) return false;
  return true;
}

  let includesExtension = function(path) {
    return getExtension(path) !== 'invalid';
  }

module.exports = isValid;