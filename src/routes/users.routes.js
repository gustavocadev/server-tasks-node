const { Router } = require("express");
const { check } = require("express-validator");
const { createUser } = require("../controllers/users.controllers");
const existsEmail = require("../helpers/customCheckers");
const checkErrors = require("../middlewares/checkErrors");
const User = require("../models/User");

const router = Router();

router.get("/", async (req, res) => {
    const users = await User.find();

    res.json({
        users,
    });
});

router.post(
    "/",
    [
        check("name", "The name is required").notEmpty(),
        check("email", "the email is not valid").isEmail().notEmpty(),
        check("password", "password need to be 6 characters at least").isLength(
            { min: 6 }
        ),
        check("email").custom((email) => existsEmail(email)),
        checkErrors,
    ],
    createUser
);

module.exports = router;
