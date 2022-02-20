const User = require("../models/User");

const existsEmail = async (email) => {
    const user = await User.findOne({ email });

    if (user) {
        throw new Error("Email already exists");
    }
};

module.exports = existsEmail;
