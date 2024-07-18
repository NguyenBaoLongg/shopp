const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);
const Schema = mongoose.Schema;

const UserVerificationSchema = new Schema({
    userId: { type: String },
    uniqueString: { type: String },
    createAt: { type: Date },
    expriseAt: { type: Date },
});

module.exports = mongoose.model(
    "UserVerificationSchema",
    UserVerificationSchema
);
