/**
 * @file page logic
 * @author jessie
 */

const apis = require('../utils/apis');
const utils = require('../utils');

module.exports = class {

    model(modelName) {
        const ModelClass = require('../' + modelName.toLowerCase());
    }

    renderListPage(req, res) {
        // 获取数据请求
        apis.getList()
            .then(listStr => {

                const listObj = utils.convert(listStr);
                const reactTpl = utils.renderSSR({
                    list: listObj.data
                });
                // 渲染
                res.render('index', {
                    listData: JSON.stringify({
                        list: listObj.data
                    }),
                    content: reactTpl
                });
            });
    }

}