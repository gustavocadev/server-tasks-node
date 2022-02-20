const { request } = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const isAuth = async (req = request, res, next) => {
    const token = req.header("x-token");
    if (!token) {
        return res.json({
            message: "No token provided",
        });
    }

    try {
        const userPayload = jwt.verify(token, process.env.SECRET_PRIVATE_KEY);
        // console.log(userPayload);
        // exists user?
        const userFound = await User.findById(userPayload.userId);

        if (!userFound) {
            return res.json({
                message: "User not found",
            });
        }

        req.user = userFound;

        next();
    } catch (error) {
        res.json({
            message: error,
        });
    }
};

module.exports = isAuth;
