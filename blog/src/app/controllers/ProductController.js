const Product = require("../models/product");
const MyProduct = require("../models/myproducts");
const { mongooseToObject } = require("../../resources/util/mongoose");
const ProductService = require("../../resources/services/ProductService");
const User = require("../models/user");
const jwtVerify = require("../../resources/services/JwtVerify");
const port = 3000;

class ProductController {
    //[GET]/products/:slug
    show = async (req, res, next) => {
        const productId = req.params.id;
        const decoded = jwtVerify.jwtVerifyAccessToken(
            req.cookies.access_token);
            if(decoded){
                const userId = decoded.payload.id;
                const user = await User.findById(userId); 
                await Product.findOne({ _id: productId })
                .then((product) => {
                res.render("products/show", {
                    product: mongooseToObject(product),
                    user:user.toObject(),
                    });
                })
                .catch(next);
            }
            else{
               await Product.findOne({ _id: productId })
            .then((product) => {
                res.render("products/show", {
                    product: mongooseToObject(product),
                });
            })
            .catch(next); 
            }
    };

    //[GET]
    create(req, res, next) {
        User.findById({ _id: req.data._conditions._id }).then((user) => {
            res.render("products/create", {
                user: user.toObject(),
            });
        });
    }

    //[POST]
    store = async (req, res, next) => {
        try {
            const {
                title,
                image,
                price,
                percent,
                discout,
                timeDiscout,
                soldProduct,
                description,
                userId,
            } = req.body;
            const nameFile = req.file.originalname;
            req.body.userId = req.data._conditions._id;
            req.body.image = nameFile;
            req.body.percent = "";
            req.body.timeDiscout = "";
            req.body.soldProduct = "";

            if (!title || !nameFile || !price || !discout || !description) {
                return res.status(200).json({
                    status: "ERR",
                    message: "The input is required",
                });
            }
            const response = await ProductService.createProductService(
                req.body
            );
            if (response.status == "SUCCESS") {
                return res.redirect("back");
            }
        } catch (e) {
            return res.status(404).json({
                status: "Failede",
                message: e,
            });
        }
    };

    //[GET]/products/:id/edit
    async edit(req, res, next) {
        const decoded = jwtVerify.jwtVerifyAccessToken(
            req.cookies.access_token);
        const userId = decoded.payload.id;
        const user = await User.findById(userId);
        MyProduct.findById(req.params.id)
            .then((product) =>
                res.render("products/edit", {
                    product: mongooseToObject(product),
                    user: user.toObject(),
                })
            )
            .catch(next);
    }

    //[PUT]/products/:id
    update = async (req, res, next) => {
        try {
            const productId = req.params.id;
            const data = req.body;
            if (!productId) {
                return res.status(200).json({
                    status: "ERR",
                    message: "The userId is required",
                });
            }
            const response = await ProductService.updateProductService(
                productId,
                data
            );
            return res.status(200).json(response);
        } catch (e) {
            return res.status(404).json({
                status: "FAILED",
                message: e,
            });
        }
    };

    //[DELETE]/products/:id
    destroy = async (req, res, next) => {
        try {
            const productId = req.params.id;
            if (!productId) {
                return res.status(200).json({
                    status: "ERR",
                    message: "The userId is required",
                });
            }
            const response = await ProductService.deleteProductService(
                productId
            );
            if(response.status==="status"){
                return res.redirect("back");
            }
            return res.redirect("back");
            
        } catch (e) {
            return res.status(404).json({
                status: "FAILED",
                message: e,
            });
        }
    };

    getALlProduct = async (req, res) => {
        try {
            const { limit, page, sort, filter } = req.query;
            const response = await ProductService.getAllProductService(
                limit,
                Number(page),
                sort,
                filter
            );
            return res.status(200).json(response);
        } catch (e) {
            return res.status(404).json({
                status: "FAILED",
                message: e,
            });
        }
    };
}

module.exports = new ProductController();
