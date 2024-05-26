const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("../middleware/errorMiddleware");
const connectDB = require("../config/db");
const port = process.env.PORT || 5000;
const cors = require("cors");

connectDB();

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/models", require("../routes/dataRoutes"));
app.use("/api/comments", require("../routes/commentRoutes"));

app.get("/", (req, res) => {
  res.send(`
  <b>Kartonowe budowle api</b><br><br>
  Database: MongoDB <br>
  Author: Paweł Chudecki <br><br>
  Routes: <br>
  /api/models <br>
  /api/comments 
  `);
});

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));

module.exports = app;
