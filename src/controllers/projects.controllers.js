const { request } = require("express");
const Project = require("../models/Project");

const createProject = async (req, res) => {
    try {
        const { name } = req.body;
        const projectTemplate = {
            name,
            author: req.user._id,
        };
        // let's create a new project
        const newProject = new Project(projectTemplate);
        await newProject.save();

        res.json({
            message: "Create project",
            newProject,
        });
    } catch (error) {
        res.json({
            message: "Error creating project",
        });
    }
};

const updateProject = async (req = request, res) => {
    const { name } = req.body;
    const { id } = req.params;

    try {
        const project = await Project.findById(id);

        if (!project) {
            res.json({
                message: "Project not found",
            });
            return;
        }
        if (project.author.toString() !== req.user._id.toString()) {
            res.json({
                message: "You are not authorized",
            });
            return;
        }

        const projectUpdated = await Project.findByIdAndUpdate(
            { _id: id },
            {
                name,
            },
            {
                new: true,
            }
        );

        res.json({
            message: "Update project",
            projectUpdated,
        });
    } catch (error) {
        res.json({
            message: "Error updating project",
        });
    }
};

const deleteProject = async (req, res) => {
    const { id } = req.params;

    try {
        const project = await Project.findById(id);
        if (!project) {
            res.json({
                message: "Project not found",
            });
            return;
        }
        if (project.author.toString() !== req.user._id.toString()) {
            res.json({
                message: "You are not authorized",
            });
            return;
        }

        await Project.findByIdAndDelete(id);

        res.json({
            message: "Deleted project",
            success: true,
        });
    } catch (error) {}
};

module.exports = {
    createProject,
    updateProject,
    deleteProject,
};
