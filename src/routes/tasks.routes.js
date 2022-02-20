const { Router } = require("express");
const { check } = require("express-validator");
const {
    createTask,
    getTasksByProject,
    updateTask,
    deleteTask,
} = require("../controllers/tasks.controllers");
const checkErrors = require("../middlewares/checkErrors");
const isAuth = require("../middlewares/isAuth");
const router = Router();

router.post(
    "/",
    [
        isAuth,
        check("name", "The name is required.").not().isEmpty(),
        checkErrors,
    ],
    createTask
);

router.get("/", isAuth, getTasksByProject);

router.put("/:id", isAuth, updateTask);

router.delete("/:id", isAuth, deleteTask);

module.exports = router;
