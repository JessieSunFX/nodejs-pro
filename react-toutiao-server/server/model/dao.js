/**
 * @file DAO
 * @author jessie
 */
var mysql = require('mysql');

module.exports = class {

    constructor() {
        this.ensureConnection();
    }

    ensureConnection() {
        if(!this.pool) {
            this.pool = mysql.createPool({//创建一个连接池，推荐
                host: '127.0.0.1',
                user: 'root',
                password: 'jessie1024',
                database: 'toutiao',
                insecureAuth: true //线上一般会不加
            });
        }

        return new Promise((resolve, reject) => {
            this.pool.getConnection(function(err, connect) {
                if(err) {
                    reject(err);
                }
                resolve(connect);
            });
        });

        // if (!this.connection) {
        //     this.connection = mysql.createConnection({
        //         host: '127.0.0.1',
        //         user: 'root',
        //         password: 'jessie1024',
        //         database: 'toutiao',
        //         insecureAuth: true //线上一般会不加                 
        //     });
        // }
        // return this.connection;
    }

    query(sql) {
        return new Promise((resolve, reject) => {
            let connection = this.ensureConnection();
            connection.query(
                sql,
                function(err, result) {
                    if (err) {
                        reject(err);
                    }
                    resolve(result);
                    connection.release();//一定要记得释放
                }
            );
        });
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new Dao();
        } 
        return this.instance;
    }
}