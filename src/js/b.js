console.log('我是模块b')


//b.js
require('./c.js');
const $ = require('jquery')
function fn() {
  console.log('b-------');
}
module.exports = fn();