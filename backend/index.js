const express = require("express");
const app = express();
const attendence = require("./routes/attendence");
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const authentication = require("./routes/authentication");
dotenv.config();
const PORT = 4000;

// Connect to the database
database.connect();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: "http://localhost:3000", 
        credentials: true,
    })
);

// Routes
app.use("/api/v1/attendence", attendence);
app.use("/api/v1/authentication", authentication);


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
