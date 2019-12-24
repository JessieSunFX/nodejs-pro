var Dao = require('./dao');
module.exports = class User {
    constructor(params) {
        this.dao = Dao.getInstance();
        this.params = params;
    }

    check() {
        let query = Object.keys(this.params)
            .map(key => {
                let value = typeof this.params[key] === 'number' ? this.params[key] : `'${this.params[key]}'`;
                `${key}=${value}`
            }).join(' and ');
        return this.dao.query(
            `select * from User where ${query};`)
            .then(res => res && res[0])
            .then(function(res) {
                if (res) {
                    return Promise.resolve();
                }
                return Promise.reject();
            });
    }

    static getInstance(params) {//不做单例
        // if (!this.instance) {
        //     this.instance = new User(params);
        // }
        // return this.instance;
        return new User(params);
    }
}