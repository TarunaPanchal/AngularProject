const CODE = {
    requiredField:500,
    ok:200,
    badrequest:400,
    Unauthorized:401
}

const REQUIREDFIELDS = {
    isRequired:' field required',
    firstname: 'firstname field required ',
    lastname: 'lastname field required',
    image : 'image field required',
    username: 'e-mail field required ',
    password: ' password field reqired ',
    invalidFirstname :'Invalid Firstname',
    invalidLastname:'Invalid Lastname',
    inValidUsername : 'Invalid E-mail'
}

const MESSAGE = {
    successLogin: 'Login successfully.',
    sucessuserRegister:'User register successfully.',
    erroruserRegister:'User registration failed',
    issueInQuery:'There is some issue with query.',
    notFoundUserListing:'User not found.',
    invalidUsernamePassword: 'Invalid username and password.',
    successUserEdit:'Updated successfully.',
    successUserdisable:'User Disable Successfully ',
    errorUserdisable:'Error User Disable',
    notFound:"Record Not found.",
    issueInQuery:'There is some issue with query.',
    successDelete:"Deleted successfully.",
    successList:"List successfully.",
    FILE_UPLOAD_SUCCESS: "File successfully uploaded",
    UserAlreadyExists:'User already registered with same email.',
}

module.exports = {
    CODE,
    REQUIREDFIELDS,
    MESSAGE
}