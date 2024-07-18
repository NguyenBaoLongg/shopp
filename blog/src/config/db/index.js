const mongoose = require("mongoose");
require("dotenv").config();

console.log("MONGODB_URI:", process.env.MONGODB_URI);

async function connect() {
    try {
        const uri = process.env.MONGODB_URI;
        if (!uri) {
            throw new Error("MONGODB_URI is not defined in the .env file");
        }

        await mongoose.connect(uri, {});
        console.log("Connect successful");
    } catch (error) {
        console.log("Error connecting to MongoDB:", error);
    }
}

module.exports = { connect };
