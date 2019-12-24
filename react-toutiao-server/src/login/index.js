import React, {Component} from 'react';
import {Provider, connect} from 'react-redux';
import {BrowserRouter, Route, Link, withRouter} from 'react-router-dom';
import { resolve } from 'path';

export default class extends Component {

    constructor(props) {
        super(props);
        this.form = {};
    }

    render() {
        return (<div>
            <h1>登录页面</h1>
            <div>
                <form onSubmit={this.login.bind(this)}>
                    <div>
                        <label>用户名：</label>
                        <input name="username" onChange={this.valueChange.bind(this, 'username')} />
                    </div>
                    <div>
                        <label>密码：</label>
                        <input name="password" onChange={this.valueChange.bind(this, 'password')} />
                    </div>
                    <input type="submit" value="登录" />
                </form>
            </div>
        </div>);
    }

    valueChange(key, event) {
        console.log('change:::', event.target.value);
        this.form[key] = event.target.value;
    }

    login(event) {
        // 发请求到服务端开始登录
        console.log('username and password:', this.form);
        fetch('/data/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8' 
            },
            credentials: 'same-origin',
            body: JSON.stringify(this.form)
        })
        .then(res => res.json())
        .then(res => {
            if(+res.errcode === 0) {
                window.location.href = '/home';
                console.log('登录结果：', res);
            }
        })
        event.preventDefault();
    }

}