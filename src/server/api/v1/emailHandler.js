// emailHandler.js
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import process from 'process';
import AWS from 'aws-sdk';

dotenv.config();

AWS.config.update({
    region: process.env.AWS_REGION, 
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });
const sns = new AWS.SNS();
const emailHandler = (app) => {
    app.post('/api/send-email', async (req, res) => {
        console.log("RECEIVED POST REQUEST", req.body);
        // Set up your SMTP server settings here
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'yums.chinese.collierville@gmail.com',
            subject: `New message from ${req.body.name}`,
            text: `You received a new message from ${req.body.email} (Phone: ${req.body.phone}): ${req.body.message}`,
        };
        const params = {
            Message: `New message from ${req.body.name}: ${req.body.message}`,
            PhoneNumber: `+1${req.body.phone}`,
        };


        try {
            await transporter.sendMail(mailOptions);
            await sns.publish(params).promise();
            res.json({ message: 'Email and SMS sent successfully' });
        } catch (error) {
            console.error('Error:', error);

            // Check if the response has already been sent
            if (!res.headersSent) {
                res.status(500).send('Error occurred while sending email or SMS');
            }
        }
    });
};

export default emailHandler;
