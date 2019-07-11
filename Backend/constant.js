const DB_MODEL_REF = {
    USERMASTER: "UserMaster",
    ROLE:'Role',
    module:'Modules',
};

const STATUS_CODE = {
    ERROR: 0,
    SUCCESS: 1
};

const MESSAGES = {
    intrnlSrvrErr: "Please try after some time.",
    unAuthAccess: "Unauthorized access.",
    tokenGenError: "Error while generating access token",
    invalidEmail: "Please fill valid Email Address",
    nameCantEmpty: "Name can't be empty",
    passCantEmpty: "Password can't be empty",
    validationError : "Validation errors",
    incorrectPass: "Invalid email or passoword",
    userNotFound: "User not found.",
    accessTokenCantEmpty: "Access token cannot be empty",
    tokenSecretCantEmpty: "Secret token cannot be empty",
    
};

module.exports = Object.freeze({
    APP_NAME: 'AngularProject',
    STATUS_CODE: STATUS_CODE,
    DB_MODEL_REF: DB_MODEL_REF,
    MESSAGES : MESSAGES,
});