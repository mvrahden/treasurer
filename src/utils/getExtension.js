'use strict';
let extensionMatcher = /\.(txt|csv|json)$/;

/**
 * Extracts the extension from a path-String.
 * @param {String} path - String representation of a path.
 * @returns {String} extension or 'invalid'.
 */
let getExtension = function(path) {
  let extensionMatches = extensionMatcher.exec(path);
  if(extensionMatches === null || extensionMatches.length === 0)
    return 'invalid';
  else if(extensionMatches.length > 1)
    return extensionMatches[extensionMatches.length - 1];
  if(extensionMatches.length === 1)
    return extensionMatches[0];
};

module.exports = getExtension;
