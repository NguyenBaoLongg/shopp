const Product = require("../models/product");
const User = require("../models/user");
const {
    mongooseToObject,
    mutippleMongooseToObject,
} = require("../../resources/util/mongoose");
const ProductService = require("../../resources/services/ProductService");
const productController = require("./ProductController");
const UserController = require("./UserController");

class adminController {
    listProduct = (req, res, next) => {
        let productQuery = Product.find({});

        if (req.query.hasOwnProperty("_sort")) {
            productQuery = productQuery.sort({
                [req.query.column]: req.query.type === "asc" ? -1 : 1,
            });
        }
        productQuery
            .then((product) => {
                res.render("admin/list-products", {
                    product: mutippleMongooseToObject(product),
                });
            })
            .catch(next);
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

    deleteProduct = async (req, res, next) => {
        productController.destroy(req, res, next);
    };

    listUser = async (req, res, next) => {
        User.find()
            .then((user) => {
                res.render("admin/list-users", {
                    user: mutippleMongooseToObject(user),
                });
            })
            .catch(next);
    };

    deleteUser = async (req, res, next) => {
        UserController.deleteUser(req, res, next);
    };
}

module.exports = new adminController();
