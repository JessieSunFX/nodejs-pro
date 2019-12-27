/**
 * @file page logic
 * @author jessie
 */

const apis = require('../utils/apis');
const utils = require('../utils');
const Dao = require('../model/dao');
const User = require('../model/user');

module.exports = class {

    constructor() {
        this.dao = Dao.getInstance();
    }

    model(modelName) {
        return require('../model/' + modelName.toLowerCase());
    }

    renderListPage(req, res) {
        console.log('userinfos???', req.cookies);

        this.dao.getCacher()
            .get('user_' + req.cookies.userid)
            .then(userInfo => {
                if(!userInfo) {
                    User.getInstance({
                        id: req.cookies.userid
                    })
                    .check()
                }
                return userInfo;
            })
            .then(userInfoStr => JSON.parse(userInfoStr))
            .then(userInfo => {
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
                        content: reactTpl,
                        username: userInfo.username
                    });
                });
            });
        
    }

}