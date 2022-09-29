const router = require("express").Router();
const cors = require("cors");
//For sending emails
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

require("dotenv").config();

router.use(cors());

//Body Parser Middleware
router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

router.post("/send_email", cors(), async (req,es) => {

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

module.exports = router;