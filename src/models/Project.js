const { model, Schema } = require("mongoose");

const ProjectSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

ProjectSchema.methods.toJSON = function () {
    const { _id, __v, ...project } = this.toObject();
    project.id = _id;
    return project;
};

module.exports = model("Project", ProjectSchema);
