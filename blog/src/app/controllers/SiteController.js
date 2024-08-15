const Product = require("../models/product");
const User = require("../models/user");
var jwt = require("jsonwebtoken");
const jwtVerify = require("../../resources/services/JwtVerify");
const {
    mutippleMongooseToObject,
    mongooseToObject,
} = require("../../resources/util/mongoose");
class SiteController {
    //[GET]
    index = async (req, res, next) => {
        if (jwtVerify.jwtVerifyAccessToken(req.cookies.access_token)) {
            const decoded = jwtVerify.jwtVerifyAccessToken(
                req.cookies.access_token
            );
            const userId = decoded.payload.id;

            User.find({ _id: userId }).then((user) => {
                Product.find({}).then((product) => {
                    res.render("home", {
                        product: mutippleMongooseToObject(product),
                        user: user[0].toObject(),
                    });
                });
            });
        } else {
            Product.find({}).then((product) => {
                res.render("home", {
                    product: mutippleMongooseToObject(product),
                });
            });
        }
    };

    //[GET]/search

    renderSignIn(req, res, next) {
        res.render("user/sign-in");
    }

    renderSignUp(req, res, next) {
        res.render("user/sign-up");
    }
}

module.exports = new SiteController();
