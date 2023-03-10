require("dotenv").config();
const cors = require("cors");
const express = require("express");
const { connectToDB } = require("./config/db");
const multer = require("multer");
const path = require("path");

const courseRoutes = require("./routes/courseRoutes");

const app = express();

//Connect Mongo
connectToDB();

app.use(cors("*"));
app.use(express.json());

app.get("/", (req, res) => res.json({ msg: "Welcome to the API" }));

// Define Routes
app.use("/api/courses", courseRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`back end is running on port: ${PORT}`);
});
