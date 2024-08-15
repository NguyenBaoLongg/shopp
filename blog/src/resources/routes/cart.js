const express = require("express");
const router = express.Router();
const { authLoginMiddleware } = require("../middleware/authMiddleware");

const cartConroller = require("../../app/controllers/cartController");

// newController.index

router.get("/", authLoginMiddleware, cartConroller.myCart);
router.post("/add/:id", authLoginMiddleware, cartConroller.addProductToCart);
router.post("/delete/:id",authLoginMiddleware,cartConroller.deleteProductFromCart);

module.exports = router;
  