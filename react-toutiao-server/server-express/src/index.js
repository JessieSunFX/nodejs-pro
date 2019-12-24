/**
 * @file  entry root of toutiao server
 * @author jessie
*/

const express = require('express');
const ejs = require('ejs');
const config = require('./config');
const Actions = require('./actions');
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

    // app.engine('html', ejs.__express);//express提供了engine方法，可以去注入模板引擎；
    // 只要是符合express规范的模板引擎都可以使用；
    app.set('view engine', 'ejs');
    app.set('views', config.view.path);
    app.use('/static', express.static(config.view.staticPath));

    // 初始化所有的actions
    (new Actions()).init(app);

    app.listen(9000, () => {
        console.log('已监听 - 9000！');
    });
}

init();