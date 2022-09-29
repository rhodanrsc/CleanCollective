const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
//For sending emails
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');


require("dotenv").config();

const app = express();
//Our Port
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.post("/send_email", cors(), async (req,es) => {

  //Setting up the transporter via sendgrid.com
  let transporter = nodemailer.createTransport({
  host:'smtp.sendgrid.net',
  port: 587,
  auth: {
    user : "apikey",
    pass: process.env.SENDGRID_API_KEY
  }
  })

  //Function to send the mail
  await transporter.sendMail({
  from: "cleancollectivedev@gmail.com",
  to: req.body.userEmail,
  subject: "Registration",
  html: `<div className="email" style="
        font-family: sans-serif;
        line-height: 2;
        font-size: 20px; 
        ">
        <h2>Welcome to Clean Collective, ${req.body.username}</h2>
        <p>Thank you for signing up!</p>
    
        <p>All the best, Jimmy</p>
         </div>
      `
  }, function (error, info) {
    if (error){
      console.log("Error from server.js " + error);
      
    } else {
      console.log("Email sent: " + info.response)
    }
  })

})




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
