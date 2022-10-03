const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
//Our Port
const port = process.env.PORT || 5000;

app.use(cors({
  //This is part of the user session info storage
  origin: "http://localhost:3000", // <-- location of the react app we are connecting to
  credentials: true
}));
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const companyRouter = require("./routes/company");
const sectorRouter = require("./routes/sector");
const userPostRouter = require("./routes/user.post.route");
const userRouter = require("./routes/user");
const mailRouter = require("./routes/mail");

//Anytime someone goes to /exercises
//it will load everything from the exercisesRouter
app.use("/company", companyRouter);
app.use("/sector", sectorRouter);
app.use("/user.post.route", userPostRouter);
app.use("/user", userRouter);
app.use("/", mailRouter);


app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
