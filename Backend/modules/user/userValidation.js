const userConstant = require('./userConstants');

function isValidEmail(username) {
    var pattern = /^[A-Za-z\d\.\_\-\+]{3,64}\@([A-Za-z\d]+)\.[A-Za-z\d]+(.[A-Za-z\d]+)?$/;
    return new RegExp(pattern).test(username);
}

function isValidFirstName(firstname){
    var pattern = /^[^_\s\W\d]+$/;
    return new RegExp(pattern).test(firstname);
}
function isValidLastName(lastname){
    var pattern = /^[^_\s\W\d]+$/;
    return new RegExp(pattern).test(lastname);
}


function RegisterisRequired(req, res, next) {
    let {
        firstname,
        lastname,
        // image,
        username,
        password      
       
    } = req.body


    let response = {};

    if (!firstname) {
        
        response = {
            status: userConstant.CODE.requiredField,
            message: userConstant.REQUIREDFIELDS.firstname
        }  
    }else if (!isValidFirstName(firstname)) {
            response = {
                status: userConstant.CODE.requiredField,
                message: userConstant.REQUIREDFIELDS.invalidFirstname
            }
        
    }else if (!lastname) {
        response = {
            status: userConstant.CODE.requiredField,
            message: userConstant.REQUIREDFIELDS.lastname
        }
    } else if (!isValidLastName(lastname)) {
        response = {
            status: userConstant.CODE.requiredField,
            message: userConstant.REQUIREDFIELDS.invalidLastname
        }
    //  } else if (!image) {
    //     response = {
    //         status: companyConstant.CODE.requiredField,
    //         message: companyConstant.REQUIREDFIELDS.image
    //     }
    }
    else if (!username) {
        response = {
            status: userConstant.CODE.requiredField,
            message: userConstant.REQUIREDFIELDS.username
        }
    }else if (!isValidEmail(username)) {
        response = {
            status: userConstant.CODE.requiredField,
            message: userConstant.REQUIREDFIELDS.inValidUsername
        }
    } else if (!password) {
        response = {
            status: userConstant.CODE.requiredField,
            message: userConstant.REQUIREDFIELDS.password
        }


    if (!response.status) {
        console.log('heeloo reads', req.body);

        next();
    } else {

        res.send(response)
    }
}


}
module.exports = {
    RegisterisRequired
}