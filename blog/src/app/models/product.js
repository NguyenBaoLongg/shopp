const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);
const Schema = mongoose.Schema;

const Product = new Schema({
    title: { type: String },
    image: { type: String },
    price: { type: Number },
    percent: { type: Number },
    discout: { type: Number },
    timeDiscout: { type: String },
    soldProduct: { type: Number },
    description: { type: String },
    userId: { type: String },
    slug: { type: String, slug: "title" },
});

module.exports = mongoose.model("Product", Product);
