const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
require("dotenv").config();
const jwtVerifyAccessToken = (token) => {
    try {
        return jwt.verify(token, process.env.ACCESS_TOKEN);
    } catch (e) {
        return "";
    }
};

const jwtVerifyRefreshToken = (token) => {
    try {
        return jwt.verify(token, process.env.REFRESH_TOKEN);
    } catch (e) {
        return "";
    }
};

module.exports = {
    jwtVerifyAccessToken,
    jwtVerifyRefreshToken,
};
