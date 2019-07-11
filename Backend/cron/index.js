const express = require("express")
var app = express();
app.use(bodyParser.json());



app.listen(1801, (error) => {
    if (error)
        console.log("Unable to Connect with Server ::-----");
    else
        console.log("Server Successfully Running on ::-----" + 1801);
});