const userRouter = require("express").Router();
const tokenHandler = require('../../tokenHandler');
const upload = require('../../fileupload');
const userFacad = require('./userFacad');
const resHndlr = require("../../responseHandler");

userRouter.route('/register', upload.single('image')).post((req, res) => {
    // console.log("route")
    userFacad.insertUser(req, res)
        .then(result => resHndlr.successHandler(res, result))
        .catch(err => resHndlr.errorHandler(res, err))
})

userRouter.route('/login').post((req, res) => {
    userFacad.login(req, res).then(result => resHndlr.successHandler(res, result)).catch(err => resHndlr.errorHandler(res, err))
})

userRouter.route('/update/:userId',upload.single('image')).put([tokenHandler.verifyToken],(req, res) => {

    // console.log("in route", req.body, JSON.stringify(req.body))
    userFacad.findByIdAndUpdate(req, res)
        .then(result => resHndlr.successHandler(res, result))
        .catch(err => resHndlr.errorHandler(res, err))
})

userRouter.route('/:userId').get([tokenHandler.verifyToken],(req, res) => {
    userFacad.getUserById(req, res)
        .then(result => resHndlr.successHandler(res, result))
        .catch(err => resHndlr.errorHandler(res, err))
})

userRouter.route('/delete/:userId').delete( [tokenHandler.verifyToken], (req, res) => {
    userFacad.deleteUserById(req, res)
        .then(result => resHndlr.successHandler(res, result))
        .catch(err => resHndlr.errorHandler(res, err))
})

userRouter.route('/allUser').post([tokenHandler.verifyToken], (req, res) => {
    userFacad.getUser(req, res)
        .then(result => resHndlr.successHandler(res, result))
        .catch(err => resHndlr.errorHandler(res, err))
})

userRouter.route('/disable/:userId').put( (req, res) => {
    userFacad.disableuser(req, res)
        .then(result => resHndlr.successHandler(res, result))
        .catch(err => resHndlr.errorHandler(res, err))
})

module.exports = userRouter;