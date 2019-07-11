var mongoose = require('mongoose');
const usermodel = require('./userModel');
const UserMaster = mongoose.model('users', usermodel.UserSchema);
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dao = require('../../dao/baseDao');
const fs = require('fs');

// class Usercontroller {

async function insertUser(req) {
    console.log("Services")
    var { firstname, lastname, username, password } = req.body;

    let filename = new Date().getTime() + "-" + req.files.image.name;
    await req.files.image.mv(__dirname + '/../../../Images/' + filename);
    var userData = {
        firstname: firstname,
        lastname: lastname,
        image: filename,
        username: username,
        password: bcrypt.hashSync(password, 10)

    };
    console.log("USERDATA", userData)

    const exist = await usermodel.findOne({ username })
    if (exist) {
        return 1;
    }

    return await usermodel.create(userData).then((result) => {
        return result;
    }).catch(err => {
        return err;
    })
}

 function login(req) {
    let {
        username,
        password
    } = req.body;
    let userMasterDao = new dao(UserMaster);

  return   userMasterDao.findOne({ username: username,}).then((result,error )=>{
              if (error) {
            return error;
        } else if (!result) {
            return error;
        } else {
            let passwordMatch =  bcrypt.compareSync(password, result.password);

            if (passwordMatch) {
                // password match then generate token for the user
                var token = jwt.sign({
                    _id: result._id,
                    username: username
                }, 'abcdef', {
                        expiresIn: "1 day"
                    });
                    
                result = result.toObject();
                result.token = token;
                console.log("RESULt" , result )
                return result;
            }
        }
               
            }).catch((err) => {
                // res.send({ status: 400, message: err.message });
                return err;
            });

  }
    // }, async (error, result) => {
    //     if (error) {
    //         return error;
    //     } else if (!result) {
    //         return error;
    //     } else {
    //         let passwordMatch = await bcrypt.compareSync(password, result.password);

    //         if (passwordMatch) {
    //             // password match then generate token for the user
    //             var token = jwt.sign({
    //                 _id: result._id,
    //                 username: username
    //             }, 'abcdef', {
    //                     expiresIn: "1 day"
    //                 });
                    
    //             result = result.toObject();
    //             result.token = token;
    //             console.log("RESULt" , result )
    //             return result;
    //             // console.log("Token",result.token)
    //             // var userma={
    //             //      result:result,
    //             //     tok:token
    //             // }
    //             // console.log("data obj=============>",userma)
    //             // return userma;
               
    //         }
    //     }
    // });

    // var user = { username: req.body.username };
    // var pass = req.body.password;
    // usermodel.findOne(user).then((data) => {

    //     bcrypt.compare(pass, data.password).then((result) => {
    //         if (result) {
    //             const token = jwt.sign(user, 'abcdef', { expiresIn: '1h' });
    //             res.send({ status: 200, data: token, id: data._id, role: data.role , disable : data.disable });
    //         }
    //         else {
    //             res.send({ status: 400, message: " Wrong Password " });
    //         }

    //     }).catch((err) => {
    //         res.send({ status: 400, message: "Wrong Password " });
    //     });
    // }).catch((err) => {
    //     res.send({ status: 400, message: "Username is not valid" });
    // });
// }

function deleteUserById(req, res) {
    console.log("Deleteeee")
    return usermodel.deleteOne({ _id: mongoose.Types.ObjectId(req.params.userId) }).then((result) => {
        // res.send({ status: 200, data: data });
        // return result;
        if(!result){
            console.log("NOT RESULT")
            return 1;
        }
        if(result){
            console.log("result",result);
            return result;
        }
    }).catch((err) => {
        // res.send({ status: 400, message: err.message });
        return err;
    });
}

function getUserById(req, res) {
    console.log(' reqqqq', req.params.userId)
    return usermodel.findOne({ _id: mongoose.Types.ObjectId(req.params.userId) }).then((result) => {
        console.log("result", result);
        // res.send({ status: 200, data: data });
        return result;
    }).catch((err) => {
        // res.send({ status: 400, message: err.message });
        return err;
    });
}

function findByIdAndUpdate(req) {
    console.log("HELLO")

    console.log("firstname",req.body)

    var { firstname, lastname, username, password } = req.body;

    console.log("firstname",req.body)

    let filename = new Date().getTime() + "-" + req.files.image.name;
    req.files.image.mv(__dirname + '/../../../Images/' + filename);
    console.log("HELLO File", filename)
    console.log("REQ", req.body);
    var userData = {
        firstname: firstname,
        lastname: lastname,
        username: username
    };
    //  var a = req.file.path;
    // userData['image'] = a;

    userData['image'] = filename;

    // if (req.file.fieldname == "image") {
    //     userData['image'] = filename;
    // }

    if (password) {
        userData['password'] = bcrypt.hashSync(password, 11);
    }
    else {
        console.log("-el--->", password);
    }
    console.log('USERDATA', userData)
    return usermodel.findByIdAndUpdate({ _id: mongoose.Types.ObjectId(req.params.userId) }, { $set: userData },{ new: true }).then((result) => {
        console.log("RE", result)
        return result;
        // res.send({ status: 200, data: data });
    }).catch((err) => {
        console.log("err", err)
        return err;
        // res.send({ status: 400, message: err.message });
    })
}

function getUser(req) {

    console.log('hello there')
    let userDao = new dao(UserMaster);
    let query = {
        role: "user"
    };

    let option = {
        sort: {
            'createdAt': -1
        }
    };
    var columnName = null
    var clumnValue = null
    var key = null
    var cname = null
    if (req.body['search[value]']) {
        query['$or'] = [];
    }
    // for global search
    for (let i = 0; i < 5; i++) {
        // for if null value
        if (req.body['search[value]']) {

            if (columnName = req.body['columns[' + i + '][data]']) {
                columnName = req.body['columns[' + i + '][data]']
                clumnValue = req.body['search[value]'];
                key = columnName,
                    query['$or'].push({
                        [key]: {
                            $regex: clumnValue,
                            $options: 'i'
                        }
                    })
            }

        }
        if (req.body['order[0][column]'] == i) {
            cname = req.body['columns[' + i + '][data]'];
            option = {
                sort: {
                    [cname]: (req.body['order[0][dir]   '] == 'asc') ? 1 : -1
                }
            };
        }
    }
    // for column search 
    for (let i = 0; i < 3; i++) {
        if (req.body['columns[' + i + '][search][value]']) {
            if (columnName = req.body['columns[' + i + '][data]']) {

                columnName = req.body['columns[' + i + '][data]']
                clumnValue = req.body['columns[' + i + '][search][value]'];

                key = columnName,
                    query[key] = {
                        $regex: clumnValue,
                        $options: 'i'
                    }
            }
        }
        if (req.body['order[0][column]'] == i) {
            cname = req.body['columns[' + i + '][data]'];
            option = {
                sort: {
                    [cname]: (req.body['order[0][dir]'] == 'asc') ? 1 : -1
                }
            };
        }
    }

    option['offset'] = parseInt(req.body['start']);
    option['limit'] = parseInt(req.body['length']);
    option['collation'] = { locale: "en_US", numericOrdering: true }

    return userDao.findWithPeginate(query, option).then(function (result) {
        if (result) {

            console.log("result", result);
            return result;
        }

    }).catch(function (error) {
        return error;
    });
    // .then((result) => {
    //     console.log("DATA",result);
    //     // res.send({ status: 200, data: data })
    //     return result;
    // }).catch((err) => {
    //     console.log("err",err);
    //     // res.send({ status: 400, message: err.message });
    //     return err;
    // });
}

function disableuser(req) {
    console.log("SEDRS")
    return usermodel.findByIdAndUpdate({ _id: mongoose.Types.ObjectId(req.params.userId) }, { $set: { disable: true } }, { new: true }).then((result) => {
        // res.send({ status: 200, data: data  , disable : data.disable });
        console.log("REs",result)
        return result;
    }).catch((err) => {
        // res.send({ status: 400, message: err.message });
        return err;
    })

}

// }

module.exports = {
    insertUser,
    login,
    deleteUserById,
    findByIdAndUpdate,
    getUserById,
    getUser,
    disableuser

}

// var usercontroll = new Usercontroller();
// module.exports = usercontroll;