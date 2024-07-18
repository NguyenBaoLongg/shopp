const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
const Schema = mongoose.Schema;

const Myproduct = new Schema({
    id: { type: String },
    percent: { type: Number },
    title: { type: String },
    discout: { type: Number },
    timeDiscout: { type: String },
    price: { type: Number },
    soldProduct: { type: Number },
    image: { type: String },
    description: { type: String },
    slug: { type: String, slug: "title", unique: true },
});

module.exports = mongoose.model("Myproduct", Myproduct);
