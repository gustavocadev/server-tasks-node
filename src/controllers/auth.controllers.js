const bcryptjs = require("bcryptjs");
const generateJWT = require("../helpers/generateJWT");
const User = require("../models/User");

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userFound = await User.findOne({ email });

        if (!userFound) {
            res.json({
                message: "User not found",
            });
            return;
        }

        const matchedPassword = await bcryptjs.compare(
            password,
            userFound.password
        );

        if (!matchedPassword) {
            res.json({
                message: "Password incorrect",
            });
            return;
        }

        // generate jwt
        const token = await generateJWT(userFound);

        res.json({
            message: "Login successful",
            user: userFound,
            token,
        });
    } catch (error) {
        res.json({
            message: "Error logging in",
            error,
        });
    }
};

const getUserAthenticated = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).lean();
        const { _id, __v, password, ...body } = user;

        user.id = _id;
        res.json({
            user: body,
        });
    } catch (error) {
        res.json({
            message: "Error getting user authenticated",
            error,
        });
    }
};

module.exports = {
    login,
    getUserAthenticated,
};
