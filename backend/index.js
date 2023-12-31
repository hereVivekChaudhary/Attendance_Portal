const express = require("express");
const app = express();
const attendence = require("./routes/attendence");
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const PORT = 3000;

// Connect to the database
database.connect();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: "http://localhost:4000", 
        credentials: true,
    })
);

// Routes
app.use("/api/v1/attendence", attendence);

// Default route
app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Your server is up and running...",
    });
});



// Start the server
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});
