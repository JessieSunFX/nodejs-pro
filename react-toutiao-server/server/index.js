const numCPUs = require('os').cpus().length;
const server = require('./server');
const cluster = require('cluster');
// console.log('numCPUs::::', numCPUs);

if (false && cluster.isMaster) {
    for (var i = 0; i < numCPUs; i++) {
        cluster.fork();//启一个进程
    }
} else {
    server.init();
    console.log('开启进程', process.pid);
}

// server.init();