const express = require("express");
const morgan = require("morgan");
const dbConnect = require("./utils/dbConnect");
const cors = require("cors");

class Server {
    #port = 0;
    constructor() {
        this.app = express();
        this.#port = process.env.PORT;
        this.dbConnection();
        this.middlewares();
        this.routes();
    }

    async dbConnection() {
        await dbConnect();
    }

    middlewares() {
        this.app.use(express.json());
        this.app.use(morgan("dev"));
        this.app.use(cors());
    }
    routes() {
        this.app.use("/api/users", require("./routes/users.routes"));
        this.app.use("/api/auth", require("./routes/auth.routes"));
        this.app.use("/api/projects", require("./routes/projects.routes"));
        this.app.use("/api/tasks", require("./routes/tasks.routes"));
    }

    listen() {
        this.app.listen(this.#port, () => {
            console.log(`Server listening on port ${this.#port} 🚀`);
        });
    }
}

module.exports = {
    Server,
};
