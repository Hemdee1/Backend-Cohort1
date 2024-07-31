const express = require("express");
const mongoose = require("mongoose");
const blogRoutes = require("./src/routes/blogRoutes");
const userRoutes = require("./src/routes/userRoutes");

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTES
app.use("/user", userRoutes);
app.use("/blog", blogRoutes);

const MONGO_URI = "mongodb://127.0.0.1:27017/cohort";
const PORT = 7000;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Database connected successfully");

    app.listen(PORT, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("app is running on port " + PORT);
      }
    });
  })
  .catch((err) => {
    console.log(err);
  });
