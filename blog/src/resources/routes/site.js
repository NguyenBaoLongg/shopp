const express = require("express");
const router = express.Router();
const {
    authAdminMiddleware,
    authUserMiddleware,
} = require("../middleware/authMiddleware");
const siteController = require("../../app/controllers/SiteController");

// newController.index

router.get("/", siteController.index);
router.get("/sign-up", siteController.renderSignUp);
router.get("/sign-in", siteController.renderSignIn);

module.exports = router;
