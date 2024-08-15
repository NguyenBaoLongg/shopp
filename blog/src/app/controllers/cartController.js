const Product = require("../models/product");
const User = require("../models/user");
const {
    mongooseToObject,
    mutippleMongooseToObject,
} = require("../../resources/util/mongoose");
const CartService = require("../../resources/services/cartService");
const jwtVerify = require("../../resources/services/JwtVerify");

class CartController {
    myCart = async (req, res, next) => {
        const decoded = jwtVerify.jwtVerifyAccessToken(
            req.cookies.access_token
        );
        const userId = decoded.payload.id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send("User not found");
        }

        const userCart = user.cart;
        const cartPromises = userCart.map((productId) => {
            return Product.findById(productId.id);
        });

        const cartArray = await Promise.all(cartPromises);

        res.render("me/cart", {
            product: cartArray.map(mongooseToObject),
            user: user.toObject(),
        });
    };

    addProductToCart(req, res, next) {
        try {
            if (jwtVerify.jwtVerifyAccessToken(req.cookies.access_token)) {
                const decoded = jwtVerify.jwtVerifyAccessToken(
                    req.cookies.access_token
                );
                const userId = decoded.payload.id;
                const response = CartService.addToCart(userId, req.params.id);
                return res.redirect("back");
            }
        } catch (e) {
            return res.redirect("back");
        }
    }

    async  deleteProductFromCart(req, res, next) {
        try {
            if (jwtVerify.jwtVerifyAccessToken(req.cookies.access_token)) {
                const decoded = jwtVerify.jwtVerifyAccessToken(
                    req.cookies.access_token
                );
                const userId = decoded.payload.id;
                const response =await CartService.deleteFromCart(
                    userId,
                    req.params.id
                );
                if (response.status == "SUCCESS") {
                    return res.redirect("back");
                }
            }
        } catch (e) {
            return res.redirect("/sign-in");
        }
    }
}

module.exports = new CartController();
