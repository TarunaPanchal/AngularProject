var express = require('express');
var cors = require('cors');
var config = require('./Backend/config');
const bodyParser = require("body-parser");
const fileUpload = require('express-fileupload');

config.dbConfig((err)=>{
    if (err) {
        console.error(err, 'exiting the app.');
        return;
    }

    var app = express();
    app.use(cors())

    app.use(bodyParser.json());

    app.use(bodyParser.urlencoded({
        extended: false
    }));

    app.use(fileUpload());
    
    app.use('/images', express.static('./Images/'));
    
    require("./Backend/route")(app);

    var server = app.listen(1801, (error) => {
        if (error)
            console.log("Unable to Connect with Server ::-----");
        else
            console.log("Server Successfully Running on ::-----" + 1801);
    });

})
