var http = require('http');
var utils = require('./utils');
var apis = require('./apis');

// var TEMPLATE_ROOT_DIR = '/Users/qb/nodejs-pro/react-toutiao-server/dist/html/';
var TEMPLATE_ROOT_DIR = 'D:/myProject/nodejs-pro/react-toutiao-server/dist/html/';
var STATIC_DIR = 'D:/myProject/nodejs-pro/react-toutiao-server/dist/static/';
// var STATIC_DIR = '/Users/qb/nodejs-pro/react-toutiao-server/dist/static/';

//var count = 0;//线程是隔离上下文运行环境的

function fab(num) {
    var sum = 0;
    for(var i = 0; i < num; i++) {
        sum *= i;
    }
    return sum;
}

var cache = utils.createCacher(5 * 1000 * 1000);//5M内存

var actionMap =[
    {
        uri: /^\/home/,
        handler: function(req, res) {

            fab(1000000);

            const cacheStr = cache(TEMPLATE_ROOT_DIR + 'index.html');
            // if (cacheStr) {//这种缓存适用于每个用户看到的是一样的内容
            //     console.log('use cache!!!');
            //     res.write(cacheStr);
            //     res.end();
            //     return;
            // }

            // 获取并渲染了html字符串
            utils.readContent(TEMPLATE_ROOT_DIR, 'index.html')
                .then(content => {
                    if (false) {//做一个检测机器的脚本或者手动开关
                        apis.getList().then(listStr => {
                            const listObj = utils.convert(listStr);
                            const reactTpl = utils.renderSSR({
                                list: listObj.data
                            });
                            // console.log('count:::', count++);
                            content = content
                                // .replace('{%content%}', '<div>你是第' + count + '个访问的</div>' + reactTpl)
                                .replace('{%content%}', reactTpl)
                                .replace('{%listData%}', JSON.stringify({
                                    list: listObj.data
                                }));
                            cache(TEMPLATE_ROOT_DIR + 'index.html', content);
                            res.write(content);
                            res.end();
                        });
                    } else {//退化成前端渲染
                        apis.getList().then(listStr => {
                            const listObj = utils.convert(listStr);
                            content = content
                                .replace('{%content%}', '')
                                .replace('{%listData%}', JSON.stringify({
                                    list: listObj.data
                                }));
                            cache(TEMPLATE_ROOT_DIR + 'index.html', content);
                            res.write(content);
                            res.end();
                        });
                    }
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

// console.log('process:::', process.memoryUsage());

function init() {
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
}

module.exports.init = init;