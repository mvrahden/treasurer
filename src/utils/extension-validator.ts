const extensionMatcher = /\.(txt|csv|tsv|json)$/;

export class ExtensionValidator {
  public static getExtension(path) {
    const extensionMatches = extensionMatcher.exec(path);
    if (extensionMatches === null || extensionMatches.length === 0) {
      return 'invalid';
    }
    else if (extensionMatches.length > 1) {
      return extensionMatches[extensionMatches.length - 1];
    }
    if (extensionMatches.length === 1) {
      return extensionMatches[0];
    }
  }
}
