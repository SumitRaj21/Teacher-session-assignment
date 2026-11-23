
// const { connectDatabase } = require('./config/database');//should be replaced
// const port = Number(process.env.PORT || 3000);

// connectDatabase()
//   .then(() => app.listen(port, () => console.log(`Server listening on port ${port}`)))
//   .catch((err) => {
//     console.error('Database connection failed', err);
//     process.exit(1);
//   });


require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db.config");


// const PORT = process.env.PORT || 3000;
const PORT = Number(process.env.PORT || 3000);

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Error starting server:", error);
        process.exit(1);
    }
}

startServer();