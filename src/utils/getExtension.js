let extensionMatcher = /\.(txt|csv|json)$/;

let getExtension = function(path) {
  let extensionMatches = extensionMatcher.exec(path);
  if(extensionMatches === null || extensionMatches.length === 0) 
    return 'invalid';
  else if(extensionMatches.length > 1)
    return extensionMatches[extensionMatches.length - 1];
  if(extensionMatches.length === 1)
    return extensionMatches[0];
}

module.exports = getExtension;