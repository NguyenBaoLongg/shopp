const Product = require("../models/product");
const User = require("../models/user");
const {
    mongooseToObject,
    mutippleMongooseToObject,
} = require("../../resources/util/mongoose");
const product = require("../models/product");
const jwtVerify = require("../../resources/services/JwtVerify");
class MyProductController {
    //[GET] /me/stored/myproduct
    async storedProducts(req, res, next) {
        try {
            const decoded = jwtVerify.jwtVerifyAccessToken(
                req.cookies.access_token);
            const userId = decoded.payload.id;
            const user = await User.findById(userId);
            const products = await Product.find({ userId: userId });
    
            res.render("me/stored-products", {
                products: mutippleMongooseToObject(products),
                user: user.toObject(),
            });
        } catch (error) {
            next(error);
        }
    }

    personalInfor(req, res, next) {
        User.findById({ _id: req.data._conditions._id }).then((user) => {
            res.render("me/personalinfor", {
                user: user.toObject(),
            });
        });
    }
}

module.exports = new MyProductController();
