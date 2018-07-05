var _ = require('lodash');
var config = require('../config');


/**
 * Get unique error field name
 */
var getUniqueErrorMessage = function (err) {
    var output;

    try {
        var begin = 0;
        if (err.errmsg.lastIndexOf('.$') !== -1) {
              begin = err.errmsg.lastIndexOf('.$') + 2;
        } else {
              begin = err.errmsg.lastIndexOf('index: ') + 7;
        }
        var fieldName = err.errmsg.substring(begin, err.errmsg.lastIndexOf('_1'));
        output = fieldName.charAt(0).toUpperCase() + fieldName.slice(1) + ' already exists';

    } catch (ex) {
        output = 'Unique field already exists';
    }

    return output;
};

/**
 * Get the error message from error object
 */
module.exports.getErrorObject = function (err) {
    var response={};
    if (!_.isUndefined(err.errorCode)){
        response.errorCode= err.errorCode;
    }
    if (err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                response.message = getUniqueErrorMessage(err);
                break;
            default:
                     response.message = err.clientMessage || err.message || err.errmsg;
                    if (typeof err.stack !== 'undefined') {
                        response.error_stack = err.stack
                    }

        }
    } else {
        if (typeof err.errors !== 'undefined' && typeof err.clientMessage == 'undefined') {
            for (var errName in err.errors) {     /* mongoose errors are returned as array */
                if (err.errors[errName].message) {
                    response.message = err.errors[errName].message;
                    if (typeof err.errors[errName].errors !== 'undefined') {
                        for (var errNestedName in err.errors[errName].errors) {
                            if (err.errors[errName].message) {
                                response.message += '. ' + err.errors[errName].errors[errNestedName].message;
                            }
                        }
                    }
                }

            }
        } else {
              response.message = err.clientMessage || err.message || err.errmsg;
                if (typeof err.stack !== 'undefined') {
                    response.error_stack = err.stack
                }
        }
    }

    return response;
};
