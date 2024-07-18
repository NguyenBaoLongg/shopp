const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
    authLoginMiddleware,
    authUserMiddleware,
} = require("../middleware/authMiddleware");
const ProductController = require("../../app/controllers/ProductController");

const storage = multer.diskStorage({
    destination: function (req, file, res) {
        res(null, "./uploads/images");
    },
    filename: function (req, file, res) {
        res(null, file.originalname);
    },
});
var upload = multer({ storage: storage });
// newController.index

router.get("/create", authUserMiddleware, ProductController.create);
router.post(
    "/store",
    authUserMiddleware,
    upload.single("image"),
    ProductController.store
);
router.get("/:id/edit", authUserMiddleware, ProductController.edit);
router.put("/:id/update", authUserMiddleware, ProductController.update);
router.delete("/delete/:id", authUserMiddleware, ProductController.destroy);
router.get("/details/:id", ProductController.show);
router.get("/get-all", ProductController.getALlProduct);

module.exports = router;
