import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {persistStore, getStoredState, purgeStoredState} from "redux-persist";
import configureStore from './configureStore'
const store = configureStore();
  import { BrowserRouter } from 'react-router-dom'
import { Route } from 'react-router';
import AppLayout from 'common/AppLayout';

persistState();

function persistState() {
    var persistor = persistStore(store, {
        whitelist: [ ], blacklist: [
                 'appDataReducer',
        ] //,storage: localForage
    }, () => {
        ReactDOM.render(
            <Provider store={store}>
                <BrowserRouter>
                    <Route path="/" component={AppLayout}/>
                </BrowserRouter>
             </Provider>
            , document.querySelector('.reactContainer'))
    })
}
