const mongoose = require("mongoose");
const { Schema } = mongoose;
const UserSchema = new Schema({
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    fullname: {
        type: String,
        required: true
    },
    status: {
        type: String,
    },
    about: {
        type: String,
    },
    address: {
        type: String,
    },
    // address: {
    //     type: Arr,
    //     required: true
    // }
  });

const User = mongoose.model("user", UserSchema);

module.exports = { User };
