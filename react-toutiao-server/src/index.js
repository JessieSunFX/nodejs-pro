/**
 * @file entry file
 * @author jessie
 */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Link, Switch} from 'react-router-dom';
import createStore from './store';
import AppContainer from './app';
import {Provider, connect} from 'react-redux';

// setTimeout(() => {
    const store = createStore(window.initListData);
    ReactDOM.hydrate(<BrowserRouter>
            <Provider store={store}>
                <AppContainer />
            </Provider>
        </BrowserRouter>,
        document.getElementById('app')
    );
// }, 5000);


