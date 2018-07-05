import React from 'react';

import { createStore, applyMiddleware, compose } from 'redux';

import rootReducer from './reducers';

import thunk from 'redux-thunk';



import {REHYDRATE} from 'redux-persist/constants'
import createActionBuffer from 'redux-action-buffer'


const middleware = [thunk, createActionBuffer(REHYDRATE)];

     const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default function configureStore() {
    const store = createStore(rootReducer, undefined, composeEnhancers(
        applyMiddleware(...middleware),
         //autoRehydrate({ log: true }) /* it is rehydrate all reducers, including blacklisted */
    ));

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('./reducers', () => {
            const nextRootReducer = require('./reducers/index');
            store.replaceReducer(nextRootReducer);
        });
    }
 return store;
}
