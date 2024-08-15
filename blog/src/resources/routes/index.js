const newsRouter = require("./new");
const productRouter = require("./products");
const meRouter = require("./me");
const siteRouter = require("./site");
const adminRouter = require("./admin");
const userRouter = require("./user");
const cartRouter = require("./cart");

function route(app) {
    app.use("/new", newsRouter);
    app.use("/me", meRouter);
    app.use("/products", productRouter);
    app.use("/api/user", userRouter);
    app.use("/admin", adminRouter);
    app.use("/cart", cartRouter);
    app.use("/", siteRouter);
}

module.exports = route;
