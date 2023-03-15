require("dotenv").config();
const cors = require("cors");
const express = require("express");
const { connectToDB } = require("./config/db");

const courseRoutes = require("./routes/courseRoutes");
const classroomRoutes = require("./routes/classroomRoutes");

//Connect Mongo
connectToDB();

const app = express();

app.use(cors("*"));
app.use(express.json());

app.get("/", (req, res) => res.json({ msg: "Welcome to the API" }));

// Define Routes
app.use("/api/courses", courseRoutes);
app.use("/api/classrooms", classroomRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`back end is running on port: ${PORT}`);
});
