const jwt = require('jsonwebtoken');

const common = {
    jwtSign: async function (user_id, user_type) {
        try {
            const expirationTime = Math.floor(Date.now() / 1000) + (720 * 60);

            let enc_data = {
                exp: expirationTime,
                data: { user_id, user_type }
            }

            const token = jwt.sign(enc_data, process.env.JWT_SECRET_KEY);
            return token;
        } catch (error) {
            console.error(error);
            throw new Error("token_signing_error");
        }
    },

    jwtValidate: async function (token) {
        try {
            const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
            return verified;
        } catch (error) {
            console.error(error);

            if (error.name === 'JsonWebTokenError') {
                throw new Error("token_invalid");
            } else {
                throw new Error("access_denied");
            }
        }
    },
};

module.exports = common;
