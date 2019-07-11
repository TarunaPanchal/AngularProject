'use strict';

const mongoose = require('mongoose');

function connectDb(callback){

    let dbname = 'AngularProject';
    let dburl = 'mongodb://localhost:27017/'+dbname;

    console.info("Connecting to:----- " + dburl);
  
    mongoose.connect(dburl,{ useNewUrlParser: true, useCreateIndex : true });

    mongoose.connection.on('connected', function () {
        console.info('Connected to DB:-----', dbname, 'at', dburl);
        callback();
    });

    // If the connection throws an error
    mongoose.connection.on('error', function (err) {
        console.info('DB connection error ::----- ' + err);
        callback(err);
    });

    // When the connection is disconnected
    mongoose.connection.on('disconnected', function () {
        console.info('DB connection disconnected ::-----');
        callback("DB connection disconnected");
    });
}

module.exports = connectDb;