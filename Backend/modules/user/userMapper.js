'use strict'
const userConstant = require('./userConstants');

function successLogin(result){
    return {
        status: userConstant.CODE.ok,
        message: userConstant.MESSAGE.successLogin,
        data: result
    }
}


function loginError(result) {
    return {
        status: userConstant.CODE.badrequest,
        message: userConstant.MESSAGE.invalidUsernamePassword,
    }
}

function sucessuserRegister(result){
    return {
        status: userConstant.CODE.ok,
        message: userConstant.MESSAGE.sucessuserRegister,
        data:result
}
}

function erroruserRegister(result){
    return {
        status: userConstant.CODE.badrequest,
        message: userConstant.MESSAGE.erroruserRegister,
        data: result
    }
}

function notFoundUserListing(){
    return {
        status: userConstant.CODE.badrequest,
        message: userConstant.MESSAGE.notFoundUserListing,
        data:[]
    }
}
function invalidUsernamePassword(){
    return {
        status: userConstant.CODE.badrequest,
        message: userConstant.MESSAGE.invalidUsernamePassword
    }
}
function successUserEdit(result){
    return {
        status: userConstant.CODE.ok,
        message: userConstant.MESSAGE.successUserEdit,
        data:result
    }

}
function errorUserdisable(result){
    return {
        status: userConstant.CODE.badrequest,
        message: userConstant.MESSAGE.errorUserdisable,
        data: result
    }
}



function successUserdisable(result){
    return {
        status: userConstant.CODE.ok,
        message: userConstant.MESSAGE.successUserdisable,
        data:result
    }

}

function notFound(){
    return {
        status: userConstant.CODE.badrequest,
        message: userConstant.MESSAGE.notFound,
        data:[]
    }

}

function issueInQuery(error){
    return {
        status: companyConstant.CODE.badrequest,
        message: companyConstant.MESSAGE.issueInQuery
    }
}

function successDelete(){
    return {
        status: userConstant.CODE.ok,
        message: userConstant.MESSAGE.successDelete,
        data:[]
    }

}

function successList(result){
    return {
        status: userConstant.CODE.ok,
        message: userConstant.MESSAGE.successList,
        data:result
    }

}

function fileuploadsucess(result){
    return {
        status: userConstant.CODE.ok,
        message: userConstant.MESSAGE.FILE_UPLOAD_SUCCESS,
        data: result
    }
}

function UserAlreadyExists(){
    return {
        status: userConstant.CODE.badrequest,
        message: userConstant.MESSAGE.UserAlreadyExists,
        data: []
    }
}

function errorusereditMapper(){
    return {
        status: userConstant.CODE.badrequest,
        message: userConstant.MESSAGE.issueInQuery
    }
}

module.exports = {
    successLogin,
    sucessuserRegister,
    erroruserRegister,
    notFoundUserListing,
    invalidUsernamePassword,
    successUserEdit,
    notFound,
    successDelete,
    successList,
    fileuploadsucess,
    UserAlreadyExists,
    loginError,
    issueInQuery,
    errorusereditMapper,
    errorUserdisable,
    successUserdisable

}
