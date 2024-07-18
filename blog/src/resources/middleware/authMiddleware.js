const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../../app/models/user");
const jwtVerify = require("../../resources/services/JwtVerify");
dotenv.config();

const authMiddleware = (req, res, next) => {
    const token = req.headers.token.split(" ")[1];

    // Debug: Ghi log token nhận được
    console.log("Token received:", token);

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        const token = req.headers.token.split(" ")[1];

        // Debug: Ghi log token nhận được
        if (err) {
            console.error("JWT verification error:", err);
            return res.status(440).json({
                message: "Authentication failed",
                status: "ERROR",
                error: err.message,
            });
        }

        // Debug: Ghi log thông tin người dùng đã giải mã
        console.log("Decoded user:", user);

        const { payload } = user;
        console.log(user);
        if (payload && payload?.isAdmin) {
            next();
        } else {
            return res.status(440).json({
                message: "Authentication failed ",
                status: "ERROR",
            });
        }
    });
};

const authUserMiddleware = (req, res, next) => {
    try {
        const decoded = jwtVerify.jwtVerifyAccessToken(
            req.cookies.access_token
        );
        const userId = decoded.payload.id;
        const data = User.findById(userId);
        if (decoded.payload?.isAdmin || data) {
            req.data = data;
            next();
        } else {
            res.redirect("/sign-in");
        }
    } catch (e) {
        res.redirect("/sign-in");
    }
};

const authLoginMiddleware = (req, res, next) => {
    try {
        const decoded = jwtVerify.jwtVerifyAccessToken(
            req.cookies.access_token
        );
        const userId = decoded.payload.id;
        const data = User.findById(userId);
        req.data = data;
        next();
    } catch (e) {
        console.log(e);
        return res.redirect("/sign-in");
    }
};

const authAdminMiddleware = (req, res, next) => {
    try {
        const decoded = jwtVerify.jwtVerifyAccessToken(
            req.cookies.access_token
        );
        const userId = decoded.payload.id;
        const data = User.find({ userId: userId, isAdmin: true });
        if (data) {
            req.data = data;
            next();
        }
    } catch (e) {
        return res.redirect("/sign-in");
    }
};

module.exports = {
    authMiddleware,
    authUserMiddleware,
    authLoginMiddleware,
    authAdminMiddleware,
};
