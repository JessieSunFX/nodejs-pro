"use strict";

var Skeleton = require('page-skeleton-webpack-plugin/src/skeleton');

var options = {
  staticPath: '__webpack_page_skeleton__',
  port: '8989',
  loading: 'spin',
  text: {
    color: '#EEEEEE'
  },
  image: {
    shape: 'rect',
    color: '#EFEFEF',
    shapeOpposite: []
  },
  button: {
    color: '#EFEFEF',
    excludes: []
  },
  svg: {
    color: '#EFEFEF',
    shape: 'circle',
    shapeOpposite: []
  },
  pseudo: {
    color: '#EFEFEF',
    shape: 'circle',
    shapeOpposite: []
  },
  device: 'iPhone 6 Plus',
  debug: false,
  minify: {
    minifyCSS: {
      level: 2
    },
    removeComments: true,
    removeAttributeQuotes: true,
    removeEmptyAttributes: false
  },
  defer: 5000,
  excludes: [],
  remove: [],
  hide: [],
  grayBlock: [],
  cookies: [],
  headless: true,
  h5Only: false,
  cssUnit: 'rem',
  decimal: 4,
  logLevel: 'info',
  quiet: false,
  noInfo: false,
  logTime: true,
  pathname: '/Users/qb/react-toutiao/skeleton',
  staticDir: '/Users/qb/react-toutiao/dist',
  routes: ['/', '/home', '/detail/112233']
};
var skeleton = new Skeleton(options);
skeleton.initialize().then(function () {
  return skeleton.genHtml('http://localhost:9000/home');
}).then(function (html) {
  console.log('html-------------------------', html);
});