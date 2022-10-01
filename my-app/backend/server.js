const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
//Our Port
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

//Routers
const companyRouter = require("./routes/company");
const sectorRouter = require("./routes/sector");
const developmentStageRouter = require("./routes/development.stage");
const userPostRouter = require("./routes/user.post.route");
const userRouter = require("./routes/user");
const mailRouter = require("./routes/mail");


//Use the Routers
app.use("/company", companyRouter);
app.use("/sector", sectorRouter);
app.use("/development.stage", developmentStageRouter);
app.use("/user.post.route", userPostRouter);
app.use("/user", userRouter);
app.use("/", mailRouter);


app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
