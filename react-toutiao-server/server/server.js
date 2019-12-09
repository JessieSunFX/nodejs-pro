var http = require('http');
var utils = require('./utils');
var apis = require('./apis');

// var TEMPLATE_ROOT_DIR = '/Users/qb/nodejs-pro/react-toutiao-server/dist/html/';
var TEMPLATE_ROOT_DIR = 'D:/myProject/nodejs-pro/react-toutiao-server/dist/html/';
var STATIC_DIR = 'D:/myProject/nodejs-pro/react-toutiao-server/dist/static/';
// var STATIC_DIR = '/Users/qb/nodejs-pro/react-toutiao-server/dist/static/';

var actionMap =[
    {
        uri: /^\/home/,
        handler: function(req, res) {
            // 获取并渲染了html字符串
            utils.readContent(TEMPLATE_ROOT_DIR, 'index.html')
                .then(content => {
                    const reactTpl = utils.renderSSR();
                    content = content.replace('{%content%}', reactTpl);
                    res.write(content);
                    res.end();
                });
        }
    },
    {
        uri: /^\/static/,
        handler: function(req, res) {
            // 从path上，获取一下静态文件的路径
            var filepath = req.url.replace(/^\/static/,'').replace(/\?.*$/,'');
            utils.readContent(STATIC_DIR, filepath)
                .then(content => {
                    res.write(content);
                    res.end();
                });
        }
    },
    {
        uri: /^\/list\/?$/,
        handler: function(req, res) {
            apis.getList().then(content => {
                const listObj = utils.convert(content);
                res.write(JSON.stringify(listObj));
                res.end();
            });
        }
    }
]; 

var server = http.createServer((req, res) => {
    // 收到请求 RPC
    // console.log('req有访问的path么????----', req.url);
    const actions = actionMap.filter(({uri}) => uri.exec(req.url));
    actions.forEach(action => action.handler(req, res));
    // console.log('actions actions actions::', actions);
    // res.write('<div>jessie come on</div>');
    // res.end();
});

server.listen(9000);