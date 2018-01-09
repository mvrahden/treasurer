import * as util from 'util';
const promisify = util.promisify ? util.promisify : require('util.promisify');

export { promisify };
