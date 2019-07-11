const userService = require('./userService');
const userMapper = require('./userMapper');
const _ = require('lodash');


function insertUser(req, res) {
    console.log("FACAD")
    return userService.insertUser(req).then(function (result) {
        console.log('result ',result)
        if (result === 1) {
            return userMapper.UserAlreadyExists();
        } else {
            return userMapper.sucessuserRegister(result);
        }

    }, function (error) {
        return userMapper.erroruserRegister(error);
    });
}

function login(req) { 
    return userService.login(req).then(function (result) {
        console.log("result in facade",result)
        return userMapper.successLogin(result)
    }, function (error) {
        return userMapper.loginError(error)
    })
}
function deleteUserById(req, res) {
    return userService.deleteUserById(req).then(function (result) {
        if (result === 1) {
            return userMapper.notFound()
        }else {
            return userMapper.successDelete(result)
        }
    }, function (error) {
        return userMapper.issueInQuery(error)
    });
 }
function getUserById(req, res) {
    return userService.getUserById(req).then(function (result) {
        if (result != "" && result != null) {
            return userMapper.successList(result)
        } else {
            return userMapper.notFound()
        }
    }, function (error) {
        return userMapper.issueInQuery(error)
    });
 }
function findByIdAndUpdate(req, res) {
    console.log("in facad",req.body)
    return userService.findByIdAndUpdate(req).then(function (result) {
         if (result != "" && result != null) {
            return userMapper.successUserEdit(result)
        } else {
            return userMapper.notFoundUserListing()
        }
    }, function (error) {
        return userMapper.errorusereditMapper(error)
    });
 }
function getUser(req, res) { 
    console.log("facad");
    return userService.getUser(req).then(function (result) {
        if (result != "" && result != null) {
            return userMapper.successList(result)
        } else {
            return userMapper.notFoundUserListing()
        }
    }, function (error) {
        return userMapper.errorusereditMapper(error)
    });
}
function disableuser(req, res) {
    console.log("DisFACAD")
    return userService.disableuser(req).then(function (result) {
        if (result != "" && result != null) {
           return userMapper.successUserdisable(result)
       } else {
           return userMapper.notFoundUserListing()
       }
   }, function (error) {
       return userMapper.errorusereditMapper(error)
   });
 }


module.exports = {
    insertUser,
    login,
    deleteUserById,
    getUserById,
    findByIdAndUpdate,
    getUser,
    disableuser
}