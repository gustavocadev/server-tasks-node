const Project = require("../models/Project");
const Task = require("../models/Task");

// Create new task
const createTask = async (req = request, res) => {
    try {
        const { name } = req.body;
        const projectFound = await Project.findOne({ author: req.user._id });

        if (!projectFound) {
            return res.json({
                message: "Project not found",
            });
        }

        if (projectFound.author.toString() !== req.user._id.toString()) {
            return res.json({
                message: "You are not authorized",
            });
        }

        // let's create a new task
        const newTask = new Task({
            name,
            project: projectFound._id,
        });

        await newTask.save();

        res.json({
            message: "Task created",
            newTask,
        });
    } catch (error) {
        res.json({
            message: "Error creating task",
        });
    }
};

const getTasksByProject = async (req, res) => {
    try {
        console.log(req.user);
        const project = await Project.findOne({ author: req.user._id });

        if (!project) {
            return res.json({
                message: "Project not found",
            });
        }

        if (project.author.toString() !== req.user._id.toString()) {
            return res.json({
                message: "You are not authorized",
            });
        }

        const tasks = await Task.find({
            project: project._id,
        }).lean();

        console.log(tasks);

        res.json({
            message: "Get tasks by project",
            tasks,
        });
    } catch (error) {
        res.json({
            message: "Error getting tasks by project",
        });
    }
};

const updateTask = async (req, res) => {
    try {
        const { id } = req.params;

        const projectExists = await Project.findOne({ author: req.user._id });

        if (projectExists.author.toString() !== req.user._id.toString()) {
            return res.json({
                message: "You are not authorized",
            });
        }

        // new task
        const newUpdatedTask = {
            ...req.body,
        };

        console.log(req.body);

        const task = await Task.findByIdAndUpdate(id, newUpdatedTask, {
            new: true,
        });

        if (!task) {
            return res.json({
                message: "Task not found",
            });
        }

        res.json({
            message: "Update task",
            task,
        });
    } catch (error) {
        res.json({
            message: "Error updating task",
            error: error.message,
        });
    }
};

const deleteTask = async (req, res) => {
    const { id } = req.params;

    try {
        const projectExists = await Project.findOne({ author: req.user._id });

        if (projectExists.author.toString() !== req.user._id.toString()) {
            return res.json({
                message: "You are not authorized",
            });
        }

        await Task.findByIdAndDelete(id);
        res.json({
            message: "Task deleted",
        });
    } catch (error) {
        res.json({
            message: "Error deleting task",
            error: error.message,
        });
    }
};

module.exports = {
    createTask,
    getTasksByProject,
    updateTask,
    deleteTask,
};
