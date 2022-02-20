const { Router } = require("express");
const { check } = require("express-validator");
const {
    login,
    getUserAthenticated,
} = require("../controllers/auth.controllers");
const existsEmail = require("../helpers/customCheckers");
const checkErrors = require("../middlewares/checkErrors");
const isAuth = require("../middlewares/isAuth");
const User = require("../models/User");

const router = Router();

router.post("/", login);

router.get("/", isAuth, getUserAthenticated);

module.exports = router;
