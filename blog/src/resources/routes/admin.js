const express = require("express");
const router = express.Router();
const {
    authAdminMiddleware,
    authUserMiddleware,
} = require("../middleware/authMiddleware");
const adminController = require("../../app/controllers/adminController");

// newController.index

router.get("/list-products", authAdminMiddleware, adminController.listProduct);
router.get("/list-users", authAdminMiddleware, adminController.listUser);
router.delete(
    "/delete-product/:id",
    authAdminMiddleware,
    adminController.deleteProduct
);
router.delete(
    "/delete-user/:id",
    authAdminMiddleware,
    adminController.deleteUser
);

module.exports = router;
