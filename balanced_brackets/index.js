var validator = require('./validator.js');

console.log('[:', validator.validate('['));
console.log('[]{():', validator.validate('[]{()'));
console.log('empty:', validator.validate(''));
console.log('():', validator.validate('(){}[]'));
console.log('[{()}](){}:', validator.validate('[{()}](){}'));
console.log('[{)]:', validator.validate('[{)]'));