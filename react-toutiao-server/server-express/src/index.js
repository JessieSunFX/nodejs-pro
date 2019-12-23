/**
 * @file  entry root of toutiao server
 * @author jessie
*/

const express = require('express');
const ejs = require('ejs');
/**
 * 1. 处理同步请求，并且渲染模板
 * 2. 处理JSON, 并最后返回JSON串 
 * 3. 做一个静态服务
 * 
*/

/**
 * 初始化整个工程
*/
function init() {
    const app = express();

    app.get('/home', function(req, res) {
        console.log('i get home!!!');
        res.send('i get home!!!!');
    });

    app.listen(9000, () => {
        console.log('已监听 - 9000！');
    });
}

init();