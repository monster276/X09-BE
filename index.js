require("dotenv").config();
const path = require("path");
const cors = require("cors");
const express = require("express");
const { connectToDB } = require("./config/db");

const authRoutes = require("./routes/auth");
const courseRoutes = require("./routes/courseRoutes");
const classroomRoutes = require("./routes/classroomRoutes");
const attendancesRoutes = require("./routes/attendancesRoutes");
const studentRoutes = require("./routes/studentRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const locationRoutes = require("./routes/locationRoutes");
const lectureRoutes = require("./routes/lectureRoutes");
const lessonRoutes = require("./routes/lessonRoutes");
const enrollCourseRoutes = require("./routes/enrollCourseRoutes");
const userRoute = require("./routes/userRoute");
const emailRoute = require("./routes/emailRoute");
//Connect Mongo
connectToDB();

const app = express();

app.use(cors("*"));
app.use(express.json());

app.get("/", (req, res) => res.json({ msg: "Welcome to the API" }));

// Define Routes
app.use("/api/courses", courseRoutes);
app.use("/api/classrooms", classroomRoutes);
app.use("/api/attendances", attendancesRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoute);
app.use("/api/upload", uploadRoutes);
app.use("/api/locations", locationRoutes);
app.use("/api/lectures", lectureRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/enrollCourse", enrollCourseRoutes);
app.use("/api/email", emailRoute);
const dirname = path.resolve();
app.use("/uploads", express.static(path.join(dirname, "/uploads")));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Back end is running on port: ${PORT}`);
});
