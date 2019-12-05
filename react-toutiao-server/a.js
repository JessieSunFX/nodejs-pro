let count = 0;
let interval = setInterval(() => {
    count ++;
    if (count > 3) {
        clearInterval(interval);
    }
    console.log('b', count);
}, 1000);
console.log('a');

var bb = require('b');