const nodemailer = require("nodemailer");
const nodemailerSendgrid = require("nodemailer-sendgrid");
require("dotenv").config();

//can be used in any custom email function
const transport = nodemailer.createTransport(
    nodemailerSendgrid({
        apiKey: process.env.SENDGRID_API_KEY,
    })
)

//here we create a function that uses our transport variable to send a certain type of email
const postAddedEmail = (post) => {
    transport
     .sendMail ({
        from: "krukmakeriet.proj@gmail.com",
        to: `${post.firstname} <${post.email}>`,
        subject: "message recieved",
        html: `<h1>Your message recieved</h1><p>Hi ${post.firstname} you suck, your message (${post.title}) has been recieved </p>`
     })
     .then(() => console.log("Email sent"))
     .catch((err) => console.log(err));
}