const { model, Schema } = require("mongoose");

const TaskSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        taskState: {
            type: Boolean,
            default: false,
        },
        project: {
            type: Schema.Types.ObjectId,
            ref: "Project",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = model("Task", TaskSchema);
