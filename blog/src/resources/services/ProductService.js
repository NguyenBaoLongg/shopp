const ProductDB = require("../../app/models/product");
port = 3000;

const createProductService = async (product) => {
    return new Promise(async (resolve, reject) => {
        try {
            let {
                title,
                image,
                price,
                percent,
                discout,
                timeDiscout,
                soldProduct,
                description,
            } = product;
            console.log("Product", product);
            // const checkProduct = await ProductDB.findOne({
            //     title: title,
            // });
            // if (checkProduct !== null) {
            //     resolve({
            //         status: "OK",
            //         message: "The name od product is already",
            //     });
            // }
            product.soldProduct = 0;
            product.timeDiscout = " ₫ 63.000 lúc 00:00";
            product.percent = Math.floor(Math.random() * (70 - 30 + 1) + 30);
            product.image = `http://localhost:${port}/images/${image}`;

            const newProduct = await ProductDB(product).save();
            if (newProduct) {
                resolve({
                    status: "SUCCESS",
                    data: newProduct,
                });
            }
        } catch (e) {
            reject({
                status: "FAILED",
                message: e,
            });
        }
    });
};

const updateProductService = async (productId, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await ProductDB.findOne({ _id: productId });
            if (!checkProduct) {
                resolve({
                    status: "OK",
                    message: "The product don't exist",
                });
            }
            console.log(productId);
            console.log(data);
            data.image = `http://localhost:${port}/images/${data.image}`;
            const newProduct = await ProductDB.updateOne(
                { _id: productId },
                data
            );
            console.log("newProduct", newProduct);
            resolve({
                status: "SUCCESS",
                data: newProduct,
            });
        } catch (e) {
            reject({
                status: "FAILED",
                message: e,
            });
        }
    });
};

const deleteProductService = async (productId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await ProductDB.findOne({ _id: productId });
            if (!checkProduct) {
                resolve({
                    status: "OK",
                    message: "The product don't exist",
                });
            }
            const newProduct = await ProductDB.deleteOne({ _id: productId });
            resolve({
                status: "SUCCESS",
            });
        } catch (e) {
            reject({
                status: "FAILED",
                message: e,
            });
        }
    });
};

const getAllProductService = async (limit, page, sort, filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            const totalProduct = await ProductDB.countDocuments();
            if (filter) {
                const label = filter[0];
                const allObjectFilter = await ProductDB.find({
                    [label]: { $regex: filter[1] },
                });
                resolve({
                    status: "SUCCESS",
                    data: allObjectFilter,
                    total: totalProduct,
                    pageCurrent: Number(page + 1),
                    totlaPage: Math.ceil(totalProduct / limit),
                });
            }
            if (sort) {
                const objectSort = {};
                objectSort[sort[1]] = sort[0];
                const allProductSort = await ProductDB.find()
                    .limit(limit)
                    .skip(page * limit)
                    .sort(objectSort);
                resolve({
                    status: "SUCCESS",
                    data: allProductSort,
                    total: totalProduct,
                    pageCurrent: Number(page + 1),
                    totlaPage: Math.ceil(totalProduct / limit),
                });
            }
            const data = await ProductDB.find()
                .limit(limit)
                .skip(page * limit);
            resolve({
                status: "SUCCESS",
                data: data,
                total: totalProduct,
                pageCurrent: Number(page + 1),
                totlaPage: Math.ceil(totalProduct / limit),
            });
        } catch (e) {
            reject({
                message: e,
            });
        }
    });
};

module.exports = {
    createProductService,
    updateProductService,
    deleteProductService,
    getAllProductService,
};
