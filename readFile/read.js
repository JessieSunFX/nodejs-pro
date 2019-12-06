// var read = require('bindings')('read');
var read = require('./build/Release/read.node');

// read(function (msg) {
//     console.log(msg);
// });

module.exports = read;
