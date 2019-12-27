/**
 * @file login logic
 * @author jessie
 */

const apis = require('../utils/apis');
const utils = require('../utils');
const Page = require('./page');

module.exports = class extends Page {

   init(app) {
       app.get('/login', (req, res) => this.render(req, res));
       this.login(app);
   }

   render(req, res) {
        this.renderListPage(req, res);
   }

   login(app) {
        app.post('/data/login', (req, res) => {

                // this.dao.getCacher().set('user_1', JSON.stringify({
                //     username: 'jessie',
                //     userpassword: 'jessie1024'
                // }))
                // .then(res => {
                //     console.log('set-ok!!!', res);
                //     this.dao.getCacher().get('user_1')
                //         .then(res => {
                //             console.log('user_1_is', res);
                //         });
                // });

                console.log('bodyParser:::', req.body);
                const {username, password} = req.body;
                const User = this.model('User');
                User.getInstance({
                    username,
                    password
                })
            .check()
            .then(userInfo => {
                return this.dao.getCacher()
                    .set('user_' + userInfo.id, JSON.stringify(userInfo))
                    .then(res => userInfo);
            })
            .then(userInfo => {
                res.setHeader('Set-Cookie', `userid=${userInfo.id};expires=${+new Date() + 5000};path=/`);
                res.send(JSON.stringify({
                    errcode: 0,
                    errmessage: '登录成功'
                }));
            })
            .catch(err => {
                console.log('出现错误:::', err);
                res.send(JSON.stringify({
                    errcode: -1,
                    errmessage: '登录失败'
                }));
            });
        })
   }
}