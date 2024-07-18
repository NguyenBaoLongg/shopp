const User = require("../models/user");
const userService = require("../../resources/services/UserService");
const jwtService = require("../../resources/services/JwtService");
const { mutippleMongooseToObject } = require("../../resources/util/mongoose");
const bcrypt = require("bcrypt");
const UserVerification = require("../models/userverification");
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");
const userverification = require("../models/userverification");
const dotenv = require("dotenv");
var ls = require("local-storage");
const cookie = require('cookie');
require("dotenv").config();
//nodemailer stuff
let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS,
    },
});

//testing success
transporter.verify((error, succes) => {
    if (error) {
        console.log(error);
    } else {
        console.log("Ready for message");
        console.log(succes);
    }
});
//env variables
class UserController {
    //[GET] /login
    signUp = (req, res, next) => {
        let _this = this;
        let { name, email, phone, password, birth, sexual, address } = req.body;
        name = name.trim();
        email = email.trim();
        phone = phone.trim();
        password = password.trim();
        phone = phone.replace(/\D/g, "");
        birth = "";
        sexual = "";
        address = "";

        if (name === "" || email === "" || password === "" || phone === "") {
            res.json({
                status: "FAILED",
                message: "Empty input fields",
            });
        } else if (!/^[a-zA-Z]*$/.test(name)) {
            res.json({
                status: "FAILED",
                message: "Invalid name entered",
            });
        } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            res.json({
                status: "FAILED",
                message: "Invalid email entered",
            });
        } else if (password.length < 8) {
            res.json({
                status: "FAILED",
                message: "Password is too short!",
            });
        } else if (phone.length !== 10 || phone.charAt(0) !== "0") {
            res.json({
                status: "FAILED",
                message: "Invalid phone number entered",
            });
        } else {
            User.find({ email })
                .then((result) => {
                    if (result.length) {
                        // A user already exists
                        res.json({
                            status: "FAILED",
                            message:
                                "User with the provided email already exists",
                        });
                    } else {
                        // Try to create new user
                        const saltRounds = 10;
                        bcrypt
                            .hash(password, saltRounds)
                            .then((hashedPassword) => {
                                const newUser = new User({
                                    name,
                                    email,
                                    password: hashedPassword,
                                    verified: false,
                                    isAdmin: false,
                                    phone,
                                    birth,
                                    sexual,
                                    address,
                                });

                                newUser
                                    .save()
                                    .then((result) => {
                                        // handle account verification
                                        _this.sendVerificationEmail(
                                            result,
                                            res
                                        );
                                    })
                                    .then(() => {
                                        return res.redirect("/sign-in");
                                    })
                                    .catch((err) => {
                                        console.log(err);
                                        res.json({
                                            status: "FAILED",
                                            message:
                                                "An error occurred while saving user!",
                                        });
                                    });
                            })
                            .catch((err) => {
                                console.log(err);
                                res.json({
                                    status: "FAILED",
                                    message:
                                        "An error occurred while hashing the password!",
                                });
                            });
                    }
                })
                .catch((err) => {
                    console.log(err);
                    res.json({
                        status: "FAILED",
                        message:
                            "An error occurred while checking for existing user",
                    });
                });
        }
    };

    sendVerificationEmail = ({ _id, email }, res) => {
        const currentUrl = "http://localhost:3000/";
        const uniqueString = uuidv4() + _id;

        //mail option
        const mailOptions = {
            from: process.env.AUTH_EMAIL,
            to: email,
            subject: "Verify Your Email",
            html: `<p>
                    Verify your email address to comlete the signup and login
                    into your account.</p><p>This link <b>expires in 6 hours</b>.</p><p>Press <a href=${
                        currentUrl +
                        "api/user/verify/" +
                        _id +
                        "/" +
                        uniqueString
                    }>here</a>to process.</p>`,
        };

        //hash the uniqueString
        const saltRounds = 10;
        bcrypt
            .hash(uniqueString, saltRounds)
            .then((hashUniqueString) => {
                //set values in userVarification collection
                const newVerification = new UserVerification({
                    userId: _id,
                    uniqueString: hashUniqueString,
                    createAt: Date.now(),
                    expireAt: Date.now() + 21600000,
                });

                newVerification
                    .save()
                    .then(() => {
                        transporter
                            .sendMail(mailOptions)
                            .then(() => {
                                //email sent and verification record savee
                                return res.json({
                                    status: "PENDING",
                                    message: "Verification email sent",
                                });
                            })
                            .catch((error) => {
                                console.log(error);
                                res.json({
                                    status: "FAILED",
                                    message: "Verification email failed",
                                });
                            });
                    })
                    .catch((error) => {
                        console.log(error);
                        res.json({
                            status: "FAILED",
                            message: "Couldn't save verification email data!",
                        });
                    });
            })
            .catch((err) => {
                console.log(err);
                res.json({
                    status: "FAILED",
                    message: "An error occurred while hashing email data!",
                });
            });
    };

    verifyEmail(req, res, next) {
        let { userId, uniqueString } = req.params;
        UserVerification.find({ userId })
            .then((result) => {
                if (result.length > 0) {
                    const { expireAt } = result[0];
                    const hashedUniqueString = result[0].uniqueString;
                    //checking for expired so we delete it
                    if (expireAt < Date.now()) {
                        userverification
                            .deleteOne({ userId })
                            .then((result) => {
                                User.deleteOne({ _id: userId })
                                    .then(() => {
                                        let message =
                                            "Link has expired. Please sign up again.";
                                        res.redirect(
                                            `/verified/error=true&message=${message}`
                                        );
                                    })
                                    .catch((error) => {
                                        let message =
                                            "Clearing user with expired inique string failed";
                                        res.redirect(
                                            `/verified/error=true&message=${message}`
                                        );
                                    });
                            })
                            .catch((error) => {
                                console.log(error);
                                let message =
                                    "An error occurred while clearing expired user verification record";
                                res.redirect(
                                    `/verified/error=true&message=${message}`
                                );
                            });
                    } else {
                        //Valid record exitsts so we validate the user string
                        //First comapre the hashed unique string
                        bcrypt
                            .compare(uniqueString, hashedUniqueString)
                            .then((result) => {
                                if (result) {
                                    //strings match
                                    User.updateOne(
                                        { _id: userId },
                                        { verified: true }
                                    )
                                        .then(() => {
                                            UserVerification.deleteOne({
                                                userId,
                                            })
                                                .then(() => {
                                                    res.render(
                                                        "/blog/src/resources/views/user/verified.hbs"
                                                    );
                                                })
                                                .catch((error) => {
                                                    console.log(error);
                                                    let message =
                                                        "An error occured while finalizing successful verification";
                                                    res.redirect(
                                                        `/verified/error=true&message=${message}`
                                                    );
                                                });
                                        })
                                        .catch((error) => {
                                            console.log(error);
                                            let message =
                                                "An error occured while updating user record to show verified";
                                            res.redirect(
                                                `/verified/error=true&message=${message}`
                                            );
                                        });
                                } else {
                                    let message =
                                        "Invalid verification details passed.Check your inbox.";
                                    res.redirect(
                                        `/verified/error=true&message=${message}`
                                    );
                                }
                            })
                            .catch((error) => {
                                let message =
                                    "An error occurred while comparing unique strings";
                                res.redirect(
                                    `/verified/error=true&message=${message}`
                                );
                            });
                    }
                } else {
                    let message =
                        "Account record doesn't exist or has been verified already. Please sign up or log in";
                    res.redirect(`/verified/error=true&message=${message}`);
                }
            })
            .catch((error) => {
                console.log(error);
                let message =
                    "An error occurred while checking for existing user verification record ";
                res.redirect(`/verified/error=true&message=${message}`);
            });
    }

    signIn = async (req, res, next) => {
        let { email, password } = req.body;
        email = email.trim();
        password = password.trim();

        if (email === "" || password === "") {
            return res.status(400).json({
                status: "FAILED",
                message: "Empty credentials supplied",
            });
        }

        try {
            const users = await User.find({ email });
            if (users.length) {
                const user = users[0];

                if (!user.verified) {
                    return res.status(403).json({
                        status: "FAILED",
                        message:
                            "Email hasn't been verified yet. Check your inbox",
                    });
                }

                const comparePassword = await bcrypt.compare(
                    password,
                    user.password
                );
                if (comparePassword) {
                    try {
                        const access_token =
                            await jwtService.gennerallAccessToken({
                                id: user._id,
                                isAdmin: user.isAdmin,
                            });

                        const refresh_token =
                            await jwtService.gennerallRefreshToken({
                                id: user._id,
                                isAdmin: user.isAdmin,
                            });

                        res.cookie("access_token", access_token, {
                            httpOnly: true,
                            secure: true,
                        });
                        res.cookie("refresh_token", refresh_token, {
                            httpOnly: true,
                            secure: true,
                        });
                        return res.redirect("/");
                    } catch (tokenError) {
                        return res.status(500).json({
                            status: "FAILED",
                            message:
                                "An error occurred while generating tokens",
                            error: tokenError.message,
                        });
                    }
                } else {
                    return res.status(401).json({
                        status: "FAILED",
                        message: "Invalid password entered",
                    });
                }
            } else {
                return res.status(401).json({
                    status: "FAILED",
                    message: "Invalid credentials entered!",
                });
            }
        } catch (err) {
            return res.status(500).json({
                status: "FAILED",
                message: "An error occurred while checking for existing user",
                error: err.message,
            });
        }
    };

    logOut = async (req, res, next) => {
        try {
            res.clearCookie("access_token", "refresh_token");
            return res.redirect("/");
        } catch (e) {
            res.json({
                message: e.message,
            });
        }
    };

    updateUser = async (req, res, next) => {
        try {
            const data = req.body;
            const response = await userService.updateUserInDB(
                req.data._conditions._id,
                data
            );
            return res.json(response);
        } catch (error) {
            return res.json({
                status: "FAILED",
                message: error.message,
            });
        }
    };

    deleteUser = async (req, res,next) => {
        const userId = req.params.id;
        const token = req.headers.cookie;
        const parsedCookies = cookie.parse(token);
        console.log(parsedCookies)
        if (!userId) {
            return res.json({
                status: "FAILED",
                message: "The user id is required",
            });
        }
        const response = await userService.deleteUserInDB(userId);
        // console.log(response)
        return res.status(200).json(response);
    };

    getAllUser = async (req, res) => {
        try {
            const response = await userService.getAllUser();
            return res.status(200).json(response);
        } catch (error) {
            return res.status(404).json({
                status: "FAILED",
                message: error,
            });
        }
    };

    getDetailUser = async (req, res) => {
        try {
            const userId = req.params.id;
            if (!userId) {
                return res.json({
                    status: "FAILED",
                    message: "The user id is required",
                });
            }
            const response = await userService.getDetailUser(userId);
            return res.status(200).json(response);
        } catch (error) {
            return res.status(404).json({
                status: "FAILED",
                message: error,
            });
        }
    };

    refreshToken = async (req, res) => {
        try {
            const token = req.headers.token.split(" ")[1];
            if (!token) {
                return res.status(200).json({
                    status: "ERR",
                    message: "The token is required",
                });
            }
            const response = await jwtService.refreshTokenJwtService(token);
            return res.status(200).json(response);
        } catch (e) {
            return res.status(404).json({
                message: e,
            });
        }
    };
}

module.exports = new UserController();
