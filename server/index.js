const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { connectDB } = require("./config/ConnectDb");
const authRoute = require("./routes/AuthRoutes");
const adminRoute = require("./routes/AdminRoutes");
const studentRoute = require("./routes/StudentRoutes");
const facultyRoute = require("./routes/FacultyRoutes");
dotenv.config();
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoute);
app.use("/api/v1/admin", adminRoute);
app.use("/api/v1/student", studentRoute);
app.use("/api/v1/faculty", facultyRoute);

const port = process.env.PORT || 5000;

connectDB();

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port} ✔️`);
});
