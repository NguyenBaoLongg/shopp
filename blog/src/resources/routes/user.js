const express = require("express");
const router = express.Router();

const {
    authMiddleware,
    authUserMiddleware,
} = require("../middleware/authMiddleware");

const userController = require("../../app/controllers/UserController");

router.post("/sign-up", userController.signUp);
router.post("/sign-in", userController.signIn);
router.post("/log-out", userController.logOut);
router.put("/update-user", authUserMiddleware, userController.updateUser);
// router.delete("/delete-user/:id", authMiddleware, userController.deleteUser);
router.get("/verify/:userId/:uniqueString", userController.verifyEmail);
router.get("/getAll", authMiddleware, userController.getAllUser);
router.get(
    "/get-details/:id",
    authUserMiddleware,
    userController.getDetailUser
);
router.get("/refresh-token", userController.refreshToken);
module.exports = router;
