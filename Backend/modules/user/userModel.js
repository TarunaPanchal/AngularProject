var mongoose = require("mongoose");
var mongoosePaginate = require('mongoose-paginate-v2');
 

const UserSchema = new mongoose.Schema({

    firstname: String,
    lastname: String,
    image: String,
    username: String,
    password: String,
    role: { type: String, default: "user" },
    disable: { type: Boolean, default: false }
}, {
        timestamps: false
    }, {
        versionKey: true
    });

UserSchema.plugin(mongoosePaginate)
const User = mongoose.model('users', UserSchema)

module.exports = User   