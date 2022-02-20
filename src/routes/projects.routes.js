const { Router } = require("express");
const { check } = require("express-validator");
const {
    createProject,
    updateProject,
    deleteProject,
} = require("../controllers/projects.controllers");
const checkErrors = require("../middlewares/checkErrors");
const isAuth = require("../middlewares/isAuth");
const Project = require("../models/Project");

const router = Router();

router.get("/", isAuth, async (req, res) => {
    try {
        const projects = await Project.find({
            author: req.user._id,
        }).lean();
        res.json({
            projects,
        });
    } catch (error) {
        console.log("error");
        res.json({
            message: "Error getting projects",
        });
    }
});

router.post(
    "/",
    [
        isAuth,
        check("name", "The name is required.").not().isEmpty(),
        checkErrors,
    ],
    createProject
);

router.put(
    "/:id",
    [
        isAuth,
        check("name", "The name is required.").not().isEmpty(),
        checkErrors,
    ],
    updateProject
);

router.delete("/:id", isAuth, deleteProject);

module.exports = router;
