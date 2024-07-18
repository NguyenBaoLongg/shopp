const express = require("express");
const router = express.Router();
const { authLoginMiddleware } = require("../middleware/authMiddleware");

const myProductController = require("../../app/controllers/MeController");

router.get(
    "/stored/personalinfor",
    authLoginMiddleware,
    myProductController.personalInfor
);
router.get(
    "/stored/myproducts",
    authLoginMiddleware,
    myProductController.storedProducts
);
router.get("/cart", authLoginMiddleware, myProductController.myCart);

module.exports = router;
