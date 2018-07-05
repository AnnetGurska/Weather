import axios from 'axios';
import config from  '../../config';
import {UPDATE_APP_DATA} from "actions/actionTypes";


export function dispatchAction(payload, actionName) {
    return (dispatch, getState) => {
         dispatch({
            type: actionName,
            payload: payload
        })
    }
}

export function makeRequest(data, methodData) {
    return (dispatch, getState) => {
        var requestPromise;
          methodData['getState'] = getState;
console.log('methodData',  methodData );
        if (_.isUndefined(methodData.type)){
            requestPromise =   axios.get(methodData['endpoint'], {
                params: data,
                baseURL: config.getEnvironment().serverBaseURL,
             });
        } else if (methodData.type == 'post') {
            requestPromise = axios.post(methodData['endpoint'], data, {
                baseURL: config.getEnvironment().serverBaseURL,
             })
        }
        return requestPromise.then(response => {
            console.log('response then',response,getState );

            if (_.isUndefined(methodData['not_display_success_message'])) {
                 _displayMessage(methodData);
            }

            if (!_.isUndefined(methodData['success_event'])) {
                var payload = {
                    ...response.data
                };
                if (!_.isUndefined(methodData['success_event_data'])) {
                    _.assign(payload, methodData['success_event_data']);
                }
                dispatch({
                    type: methodData['success_event'],
                    payload: payload
                })
            }
            return response;
        })
            .catch(error => {
                console.log('response catch',error );
                return handleError({error,methodData,dispatch})
            })
    }
}





export function handleError(params) {
    console.log('in handle error', params.error.response);
    return  new Promise ((resolve, reject) => {
         _displayMessage({
            ...params.methodData,
            messageType: 'warning',
            messageCode: getErrorMessage(params.error, params.defaultMessage)
        });

            reject(params.error);

    });

}
export function getErrorMessage(err, defaultMessage = false) {
    if (err.response) {
        return err.response.data.message;
    } else if (err.clientMessage) {
        return err.clientMessage;
    } else {
        return defaultMessage ? defaultMessage : 'errorSomethingWrong';
    }
};





export function displayMessage(params) {
    return (dispatch, getState) => {
         params['getState'] = getState;

        _displayMessage(params);
    }
}
export function _displayMessage(params) {

    var message = '';
   if(!_.isUndefined(params.messageCode)) {
         message = params.messageCode;
    }
    var notification = params.getState().appDataReducer.notification;
    if (notification) {
        notification.addNotification({
            message: message,
            level: params['messageType'] || 'success',
            autoDismiss: 15,
            position: 'br'
        });
    }

}

export function updateAppData(data) {
    return dispatch => {
        dispatch({
            type: UPDATE_APP_DATA,
            payload: data
        })
    }
}










