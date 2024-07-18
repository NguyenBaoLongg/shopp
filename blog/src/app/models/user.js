const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);
const Schema = mongoose.Schema;

const User = new Schema({
    name: { type: String },
    email: { type: String },
    password: { type: String },
    verified: { type: Boolean },
    isAdmin: { type: Boolean },
    phone: { type: String },
    gender: { type: String },
    birth: { type: String },
    address: { type: String },
    cart: { type: Array },
});

module.exports = mongoose.model("User", User);
