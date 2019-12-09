import React from 'react';
const { renderToString } = require('react-dom/server');
const { StaticRouter } = require('react-router-dom');
const hook = require('css-modules-require-hook/preset');//必须在App的上面引入
const App = require('./src/app').default;

const context = {};
const htmlStr = renderToString(
    <StaticRouter location="/home" context={context}>
        <App />
    </StaticRouter>
);
console.log('htmlStr:::', htmlStr);