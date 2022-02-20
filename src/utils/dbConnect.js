const { connect } = require("mongoose");

const dbConnect = async () => {
    try {
        const db = await connect(process.env.DB_URI);

        console.log(`Connected to ${db.connection.name}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

module.exports = dbConnect;
