"use strict";

// Load exceptions
var constants = require("./constant");
var APIResponse = require("./model/APIResponse");

// success handler
function successHandler(res, result) {

    //console.log('----------------------------------->' , result );

    var response = {
        status: result.status,
        message: result.message,
        data: result.data
    }
    _sendResponse(res, response);
}

function errorHandler(res, result) {
    var response = {
        status: result.status,
        message: result.message
    }
    _sendResponse(res, response);
}

function successcustomHandler(res, result) {
    _sendResponse(res, result);
}


function hndlError(err, req, res, next) {
    // unhandled error
    //sendError(res, err);
}

function pagingHandler(res, result) {
    _sendResponse(res, result);
}

function errorHandler(res, result) {
    var response = {
        status: result.status,
        message: result.message
    }
    _sendResponse(res, response);
}



// function sendErrorWithMsg(res, err) {
//     // if error doesn't has sc than it is an unhandled error,
//     // log error, and throw intrnl server error
//     if (!err.errorCode) {
//         //console.error(err, "unhandled error");
//         err = excep.intrnlSrvrErr(err);
//     }
//     var result = new APIResponse(constants.STATUS_CODE.ERROR, err);
//     _sendResponse(res, result);
// }

function sendSuccessWithMsg(res, msg) {
    var rslt = {
        message: msg
    };
    var result = new APIResponse(constants.STATUS_CODE.SUCCESS, rslt);
    _sendResponse(res, result);
}

function sendSuccess(res, rslt) {
    var result = new APIResponse(constants.STATUS_CODE.SUCCESS, rslt);
    _sendResponse(res, result);
}

function errorSend(res, err) {
    var result = {
        status: 0,
        error: err,
        time: new Date().getTime()
    }
    _sendResponse(res, result);
}

module.exports = {
    successHandler,
    errorHandler,
    hndlError,
    sendSuccess,
    sendSuccessWithMsg,
    errorSend,
    
    pagingHandler,
    successcustomHandler
};

function _sendResponse(res, rslt) {
    // send status code 200
    return res.send(rslt);
}