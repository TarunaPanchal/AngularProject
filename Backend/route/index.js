const userRouter = require('../modules/user/userRoute');
const responseHandler = require('../responseHandler');


module.exports = function (app) {
    app.use('/api/user',[userRouter]);

    app.use(responseHandler.hndlError);
}