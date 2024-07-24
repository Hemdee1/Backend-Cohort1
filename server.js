const express = require("express");
const mongoose = require("mongoose");
const blogRoutes = require("./src/routes/blogRoutes");

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/blog", blogRoutes);

const MONGO_URI = "mongodb://127.0.0.1:27017/cohort";
const PORT = 5000;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Database connected successfully");

    app.listen(PORT, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("app is running on port 5000");
      }
    });
  })
  .catch((err) => {
    console.log(err);
  });
