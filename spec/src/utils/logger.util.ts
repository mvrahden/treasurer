const logError = (identifier: string, err: any) => {
  console.log('\x1b[31m%s\x1b[0m', identifier);
  console.log(err);
  expect(true).toBe(false);
};

export { logError };
