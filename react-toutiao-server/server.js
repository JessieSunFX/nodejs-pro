var http = require('http');
var https = require('https');
var fs = require('fs');

var TEMPLATE_ROOT_DIR = 'D:/myProject/nodejs-pro/react-toutiao-server/dist/html/';
var STATIC_DIR = 'D:/myProject/nodejs-pro/react-toutiao-server/dist/static/';

// 渲染函数
function readContent(ROOT_DIR, path) {
    return new Promise(function(resolve, reject) {
        fs.readFile(ROOT_DIR + path, 'utf-8', function(err, content) {
            if(err) {
                reject(err);
            }
            resolve(content);
        });
    });   
}

var actionMap =[
    {
        uri: /^\/home/,
        handler: function(req, res) {
            // 获取并渲染了html字符串
            readContent(TEMPLATE_ROOT_DIR, 'index.html')
                .then(content => {
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
            readContent(STATIC_DIR, filepath)
                .then(content => {
                    res.write(content);
                    res.end();
                });
        }
    },
    {
        uri: /^\/list\/?$/,
        handler: function(req, res) {
            https.get('https://m.toutiao.com/list/?tag=__all__&ac=wap&count=20&format=json_raw&as=A1959DEE7705725&cp=5DE795A782050E1&min_behot_time=0&_signature=igshfwAA1.m8EJUOpzBzaYoLIW&i=', function(list) {
                console.log('list::::', list);
                let body = '';
                list
                    .on('data', chunk => {
                        body += chunk;
                    })
                    .on('end', () => {
                        var bodyObj = JSON.parse(body);
                        res.write(JSON.stringify({
                            data: [
                                {
                                    "type": "singlePic",
                                    "data": {
                                        "articleUrl": bodyObj.data[0].article_url,
                                        "title": bodyObj.data[0].title,
                                        "id": "i6727851773362438664",
                                        "articleType": "video",
                                        "imageList": [
                                            bodyObj.data[0].image_url
                                        ]
                                    }
                                }
                            ]
                        }));
                        res.end();
                    });
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