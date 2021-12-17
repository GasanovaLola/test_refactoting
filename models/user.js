const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const userScheme = new Schema({
    balance: String,
    picture: String,
    age: Number,
    name: String,
    gender: String,
    company: String,
    email: String,
    friends: [],
    pendingFriends: []
});

module.exports = mongoose.model("User", userScheme);