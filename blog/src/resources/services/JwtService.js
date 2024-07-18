const jwt = require("jsonwebtoken");
const gennerallAccessToken = async (payload) => {
    const access_token = jwt.sign(
        {
            payload,
        },
        process.env.ACCESS_TOKEN,
        { expiresIn: "5h" }
    );
    return access_token;
};

const gennerallRefreshToken = async (payload) => {
    const refresh_token = jwt.sign(
        {
            payload,
        },
        process.env.REFRESH_TOKEN,
        { expiresIn: "365d" }
    );
    return refresh_token;
};

const refreshTokenJwtService = (token) => {
    return new Promise((resolve, reject) => {
        try {
            console.log("Token", token);
            jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
                if (err) {
                    resolve({
                        status: "ERROR",
                        message: "The authentication",
                    });
                }
                console.log("user", user);
                const { payload } = user;
                const access_token = await gennerallAccessToken({
                    id: payload?.id,
                    isAdmin: payload?.isAdmin,
                    isVerified: payload?.isVerified,
                });
                resolve({
                    status: "SUCCES",
                    access_token,
                });
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
    gennerallAccessToken,
    gennerallRefreshToken,
    refreshTokenJwtService,
};
