const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const fs = require('fs');
const https = require('https');
const path = require('path');

const app = express();

// Environment setup
// const production = process.env.NODE_ENV === 'production'; // Use environment variable to determine the mode
const production = false;
// Configure port and host based on environment
const port = process.env.PORT || 3000; // Use PORT from environment variables if available, otherwise default to 3000
const host = production ? '0.0.0.0' : 'localhost'; // Listen on all interfaces in production, localhost in development

// Configure SSL options based on environment
let sslOptions = {};
if (production) {
    sslOptions = {
        key: fs.readFileSync('../ssl/keys/a89bf_68dc3_46aee8bd6283e6d823ae71a403bb4fc1.key'),
        cert: fs.readFileSync('../ssl/certs/chezkat_ch_a89bf_68dc3_1741478399_440a4b56ed5a2139de7961e0bc1aff45.crt')
    };
} else {
    sslOptions = {
        key: fs.readFileSync('./ssl/localhost-key.pem'),
        cert: fs.readFileSync('./ssl/localhost.pem')
    };
}

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Development-specific configuration: Serve static files and HTML
if (production == false) {
    app.use(express.static('public_html')); // Serve static files from 'public' directory
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'public_html', 'index.html')); // Serve the main HTML file
    });
}

// Email sending route
app.post('/send_email', async (req, res) => {

    let { name, email, message } = req.body;

    // Nodemailer setup for SMTP (replace with your email provider's details)
    let transporter = nodemailer.createTransport({
        host: 'mail.privateemail.com', // SMTP Host
        port: 465 , // SMTP Port (typically 465 for SSL)
        secure: true, // Use SSL (true for port 465, false for other ports)
        auth: {
            user: 'hello@chezkat.ch', // Your email address
            pass: '!Wj8hf9m', // Your email account password
        },
    });

    // Email options
    let mailOptions = {
        from: "hello@chezkat.ch", // sender address
        to: "hello@chezkat.ch", // where to send the email
        replyTo: `${name} <${email}>`, // User's email address
        subject: "New contact from " + name, // Subject line
        text: message, // Plain text body
        html: `<b>Message from:</b> ${name} <br> <b>Email:</b> ${email} <br> <b>Message:</b> <p>${message}</p>`, // HTML body content
    };

    // Send the email
    try {
        let info = await transporter.sendMail(mailOptions);
        console.log(info)
        console.log("Message sent: %s", info.messageId);
        res.send("Thank You! Your message has been sent.");
    } catch (error) {
        console.log(error);
        res.status(500).send("Something went wrong with sending the email.");
    }
});


// Start HTTPS server in production, HTTP otherwise (for development)

    https.createServer(sslOptions, app).listen(port, host, () => {
        console.log(`Server running at https://${host}:${port}/`);
    });