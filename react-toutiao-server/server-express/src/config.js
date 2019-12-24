const path = require('path');
module.exports = {
    view: {
        path: path.resolve(__dirname + '../../../dist/html/'),
        staticCompiledPath: path.resolve(__dirname + '../../../src-es5/'),
        staticPath: path.resolve(__dirname + '../../../dist/static/')
    }
};