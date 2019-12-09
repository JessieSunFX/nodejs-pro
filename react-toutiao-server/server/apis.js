var https = require('https');

// 发请求
const getList = function getList() {
    return new Promise(function(resolve, reject) {
        https.get('https://m.toutiao.com/list/?tag=__all__&ac=wap&count=20&format=json_raw', function(list) {
        // console.log('list::::', list);
        let body = '';
        list
            .on('data', chunk => {
                // console.log('chunk:::', chunk.toString());
                body += chunk;
            })
            .on('end', () => {
                resolve(body);
            });
        });
    });
}

module.exports = {
    getList: getList
};
