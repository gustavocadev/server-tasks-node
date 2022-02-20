const jwt = require("jsonwebtoken");

const generateJWT = (user) => {
    return new Promise((resolve, reject) => {
        try {
            const token = jwt.sign(
                {
                    userId: user._id,
                    email: user.email,
                    name: user.name,
                },
                process.env.SECRET_PRIVATE_KEY,
                {
                    expiresIn: "1h",
                }
            );
            resolve(token);
        } catch (error) {
            reject(new Error(error));
        }
    });
};

module.exports = generateJWT;
