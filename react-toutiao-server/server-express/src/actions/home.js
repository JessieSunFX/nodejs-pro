/**
 * @file home logic
 * @author jessie
 */

 const apis = require('../utils/apis');
 const utils = require('../utils');
 const Page = require('./page');

 module.exports = class extends Page{

    constructor() {
        super();
    }

    init(app) {
        app.get('/home', (req, res) => {
            console.log('i get home!!!');
            // res.send('i get home!!!!');
            this.render(req, res);
        });
    }

    render(req, res) {
        this.renderListPage(req, res);
    }

 }