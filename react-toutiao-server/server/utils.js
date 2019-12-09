/**
 * @file
 * @author jessie
*/
var React = require('react');
// 将jsx转换成html字符串
const { renderToString } = require('react-dom/server');
const { StaticRouter } = require('react-router-dom');
const hook = require('css-module-require-hook/preset');
const App = require('../src/app').default;
const {Provider, connect} = require('react-redux');
const store = require('../store').default;
var fs = require('fs');

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
        renderSSR();
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
    return JSON.stringify({
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
    });
}

module.exports = {
    readContent: readContent,
    convert: convert
};