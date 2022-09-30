const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
//For our express sessions
const session = require('express-session');
//To parse cookies we'll be using for the authentication
const cookieParser = require('cookie-parser')
require("dotenv").config();

const app = express();
//Our Port
const port = process.env.PORT || 5000;

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors({
  origin: "http://localhost:3000", // <-- location of the react app we are connecting to
  credentials: true
}));

app.use(express.json());

app.use(session({
  secret: "secretcode",
  resave:true, 
  saveUninitialized: true
}))

app.use(cookieParser("secretcode"));

//
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

//Anytime someone goes to /exercises
//it will load everything from the exercisesRouter
app.use("/company", companyRouter);
app.use("/sector", sectorRouter);
app.use("/user.post.route", userPostRouter);
app.use("/user", userRouter);


app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
