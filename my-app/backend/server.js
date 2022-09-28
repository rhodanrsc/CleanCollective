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

app.post("/send_mail", cors(), async (req, res) => {
  let {text} = req.body
  const transport = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
  })

	await transport.sendMail({
		from: process.env.MAIL_FROM,
		to: "test@test.com",
		subject: "test email",
		html: `<div className="email" style="
        border: 1px solid black;
        padding: 20px;
        font-family: sans-serif;
        line-height: 2;
        font-size: 20px; 
        ">
        <h2>Here is your email!</h2>
        <p>${text}</p>
    
        <p>All the best, Jimmy</p>
         </div>
    `
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
