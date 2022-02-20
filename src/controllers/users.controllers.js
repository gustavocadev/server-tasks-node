const bcryptjs = require("bcryptjs");
const { request, response } = require("express");
const generateJWT = require("../helpers/generateJWT");
const User = require("../models/User");

const createUser = async (req = request, res = response) => {
    try {
        const { name, email, password } = req.body;

        const salt = await bcryptjs.genSalt();
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        // generate jwt
        const token = await generateJWT(newUser);

        res.json({
            message: "User created successfully",
            user: newUser,
            token,
        });
    } catch (error) {
        res.json({
            message: "Error creating user",
            error,
        });
    }
};

module.exports = {
    createUser,
};
