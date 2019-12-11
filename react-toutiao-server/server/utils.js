/**
 * @file
 * @author jessie
*/
var React = require('react');
// 将jsx转换成html字符串
const { renderToString } = require('react-dom/server');
const { StaticRouter } = require('react-router-dom');
const hook = require('css-modules-require-hook/preset');
const App = require('../src-es5/app').default;
const createStore = require('../src-es5/store').default;
const {Provider, connect} = require('react-redux');
var fs = require('fs');

function mockBrowserApis() {
    var apis = {
        fetch: () => Promise.reject()
    };
    for(var name in apis) {
        global[name] = apis[name];
    }
}

mockBrowserApis();

function renderSSR(storeData) {
    const htmlStr = renderToString(
        React.createElement(
            StaticRouter,
            {
                location: "/home",
                context: {}
            },
            React.createElement(
                Provider,
                {
                    store: createStore(storeData)
                },
                React.createElement(App)
            )
        )
    );
    // console.log('htmlStr::::', htmlStr);
    return htmlStr;
}

function createCacher(maxSize) {
    var cacheMap = {};
    var usedSize = 0;
    return function(key, value) {
        if(!value) {
            return cacheMap[key];
        }
        const contentSize = value.length;//TODO 按字节特判
        if (usedSize + contentSize < maxSize) {
            cacheMap[key] = value;
            usedSize += contentSize;
        }
    }
}

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

const convert = function convert(listStr) {
    var bodyObj = JSON.parse(listStr);
    var convertedObj = {
        data: bodyObj.data.map(item => {
                let type = 'default';
                let imageList = [];
                if (item.image_list.length >= 3) {
                    type = 'multiplePic';
                    imageList = item.image_list.map(image => image.url);
                } else if (item.image_url) {
                    type = 'singlePic';
                    imageList = [item.image_url];
                }
                return  {
                    "type": type,
                    "data": {
                        "articleUrl": item.article_url,
                        "title": item.title,
                        "id": "i6727851773362438664",
                        "articleType": "video",
                        "imageList": imageList
                    }
                }
            })
    }
    return convertedObj;
}

// 集中、同步发请求
function testing(number) {
    let tasks = [];
    for(var i = 0; i < number; i++) {
        let start = performance.now();
        tasks.push(fetch('http://192.168.31.196:9000/home')  //用localhost请求不行
            .then(() => {
                let end = performance.now();
                return end - start;
            }));
    }
    return Promise.all(tasks);
}

function init() {
    var allStart = performance.now();
    testing(10).then(() => {
        var allEnd = performance.now();
        console.log('allTimes:::', allEnd - allStart);
    });
}

module.exports = {
    readContent: readContent,
    renderSSR: renderSSR,
    convert: convert,
    createCacher: createCacher
};