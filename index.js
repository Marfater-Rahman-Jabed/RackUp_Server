const express = require('express')
const app = express()
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT || 5000;

const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');

app.use(cors());
app.use(express.json());

const is_live = false //true for live, false for sandbox

function sendEmail(data) {
    const { email, message, type, name } = data
    const auth = {
        auth: {
            api_key: process.env.PRIVATE_API,
            domain: process.env.MAILER_DOMAIN
        }
    }
    const transporter = nodemailer.createTransport(mg(auth));
    transporter.sendMail({
        from: "rackupit@gmail.com", // verified sender email
        to: `rackupit@gmail.com`, // recipient email
        subject: `New Client Mr. ${name} Sent a message`, // Subject line
        text: "Hello world!", // plain text body
        html: `
        <p>Question Type: <b>${type}</b></p>
        <p>Client Name: <b>${name}</b></p>
        
        <p>Client Email: <b>${email}</b></p>
        <p >Client Message:</p>
        <h3> <b>${message}</b></h3>
        
        `, // html body
    }, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}


app.post('/sendEmail', async (req, res) => {
    const data = req.body;
    const text = 'mail is send'
    // console.log(data)
    sendEmail(data);
    res.send({ 'data': 'Mail send' })

})



app.get('/', (req, res) => {
    res.send('RackUp server is Running')
})

app.listen(port, () => {
    console.log(`RackUp server is Running on port ${port}`)
})
