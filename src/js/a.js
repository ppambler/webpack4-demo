console.log('我是模块a')

require('./c.js');
const $ = require('jquery')
function fn() {
  console.log('a-------');
}
module.exports = fn();