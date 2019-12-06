// let count = 0;
// let interval = setInterval(() => {
//     count ++;
//     if (count > 3) {
//         clearInterval(interval);
//     }
//     console.log('b', count);
// }, 1000);
// console.log('a');

var bb = require('./b.js');
var c = require('./c.json');
// console.log('require:::', require);
// console.log('cccc::::', c);
// console.log('module::::', module);
// console.log('module.constructor::::', module.constructor);

console.log('bbbbb', bb);

setTimeout(() => {
    console.log('bbbbb---', bb); //在b.js中改，a.js依然会受影响，因为是引用类型
}, 4000);