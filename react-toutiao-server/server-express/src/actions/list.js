/**
 * @file list logic
 * @author jessie
 */

const apis = require('../utils/apis');
const utils = require('../utils');

module.exports = class {

   init(app) {
       app.get('/list', (req, res) => {
            apis.getList()
                .then(content => {
                    const listObj = utils.convert(content);
                    res.send(JSON.stringify(listObj));
                });
       });
   }

}