const Product = require("../models/product");
const User = require("../models/user");
const {
    mongooseToObject,
    mutippleMongooseToObject,
} = require("../../resources/util/mongoose");
const product = require("../models/product");
class MyProductController {
    //[GET] /me/stored/myproduct
    storedProducts(req, res, next) {
        const userId = req.data._conditions._id;
        Product.find({ userId: userId })
            .then((products) => {
                res.render("me/stored-products", {
                    products: mutippleMongooseToObject(products),
                });
            })
            .catch(next);
    }

    show(req, res, next) {
        res.render("search");
    }

    personalInfor(req, res, next) {
        User.findById({ _id: req.data._conditions._id }).then((user) => {
            res.render("me/personalinfor", {
                user: user.toObject(),
            });
        });
    }

    myCart(req, res, next) {
        res.render("me/cart");
    }
}

module.exports = new MyProductController();
