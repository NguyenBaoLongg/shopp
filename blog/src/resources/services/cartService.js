const userDB = require("../../app/models/user");
const jwtVerify = require("./JwtVerify");

const addToCart = async (userId, productId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let checkUser = await userDB.find({ _id: userId });
            if (!checkUser) {
                resolve({
                    status: "FAILED",
                    message: "The user isn't defined",
                });
            }
            let productExists = false;
            const lengthCart = checkUser[0].cart.length;
            for(var i = 0;i<lengthCart;i++){
                if(checkUser[0].cart[i].id===productId){
                    checkUser[0].cart[i].quantity +=1;
                    productExists = true;
                }
            }
            if(productExists){
                const newQuantity = await userDB.updateOne({ _id: mongoose.Types.ObjectId(userId) }, {cart: checkUser[0].cart });
                return resolve({
                    status: "SUCCESS",
                });
            }
            else{
                const productObject = {
                    id:productId,
                    quantity:1,
    
                }
                checkUser[0].cart.push(productObject);
                checkUser[0].save();
                resolve({
                    status: "SUCCESS",
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

const deleteFromCart = async (userId, productId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let checkUser = await userDB.find({ _id: userId });
            if (!checkUser) {
                resolve({
                    status: "FAILED",
                    message: "The user isn't defined",
                });
            }
            checkUser[0].cart = checkUser[0].cart.filter(
                (value) => value != productId
            );
            checkUser[0].save();
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
module.exports = {
    addToCart,
    deleteFromCart,
};
