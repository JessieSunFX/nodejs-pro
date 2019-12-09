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
const store = require('../src-es5/store').default;
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

function renderSSR() {
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
                    store: store
                },
                React.createElement(App)
            )
        )
    );
    console.log('htmlStr::::', htmlStr);
    return htmlStr;
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
                    imageList = item.image_list;
                } else if (item.image_url) {
                    type = 'singlePic';
                    imageList = [image_url];
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

module.exports = {
    readContent: readContent,
    renderSSR: renderSSR,
    convert: convert
};