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
            console.log('bodyParser:::', req.body);
            const {username, password} = req.body;
            const User = this.model('User');
            User.getInstance({
                username,
                password
            })
            .check()
            .then(userInfo => {
                // res.setHeader('Set-Cookie', `userid=${userInfo.id}`);
                res.send(JSON.stringify({
                    errcode: 0
                }));
            })
            .catch(err => {
                res.send(JSON.stringify({
                    errcode: -1,
                    errmessage: '登录失败'
                }));
            });
        })
   }
}