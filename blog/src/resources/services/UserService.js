const User = require("../../app/models/user");

const updateUserInDB = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({ _id: id });
            if (!checkUser) {
                return resolve({
                    status: "FAILED",
                    message: "The user isn't defined",
                });
            }
            const updatedUser = await User.updateOne({ _id: id }, data);
            resolve({
                status: "SUCCESS",
                message: updatedUser,
            });
        } catch (e) {
            reject({
                status: "FAILED",
                message: e.message,
            });
        }
    });
};

const deleteUserInDB = async (id) => {
    try {
        return new Promise(async (resolve, reject) => {
            try {
                const checkUser = await User.findOne({
                    _id: id,
                    verified: true,
                });
                if (!checkUser) {
                    return resolve({
                        status: "FAILED",
                        message: "The user isn't defined",
                    });
                }
                await User.findByIdAndDelete(id);
                resolve({
                    status: "SUCCESS",
                    message: "Delete user success",
                });
            } catch (e) {
                reject({
                    status: "FAILED",
                    message: e.message,
                });
            }
        });
    } catch (e) {
        return e;
    }
};

const getAllUser = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allUser = await User.find();
            resolve({
                status: "OK",
                message: "find all",
                allUser: allUser,
            });
        } catch (e) {
            reject(e);
        }
    });
};

const getDetailUser = async (id) => {
    try {
        return new Promise(async (resolve, reject) => {
            try {
                const checkUser = await User.findOne({
                    _id: id,
                    verified: true,
                });
                if (!checkUser) {
                    return resolve({
                        status: "FAILED",
                        message: "The user isn't defined",
                    });
                }
                resolve({
                    status: "SUCCESS",
                    data: checkUser,
                });
            } catch (e) {
                reject({
                    status: "FAILED",
                    message: e,
                });
            }
        });
    } catch (e) {
        return e;
    }
};

module.exports = {
    updateUserInDB,
    deleteUserInDB,
    getAllUser,
    getDetailUser,
};
