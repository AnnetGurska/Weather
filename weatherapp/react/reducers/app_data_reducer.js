import { UPDATE_APP_DATA,SET_REDIRECT_URL } from "actions/actionTypes";
var _ = require('lodash');

const INITIAL_STATE = {notification: null, redirectToURL:''};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case UPDATE_APP_DATA:
            console.log('UPDATE_APP_DATA', state, action );
            var updatedstate = {
                ...state,
                ...action.payload
            };
            return updatedstate;

        default:

            return state;
    }
}
