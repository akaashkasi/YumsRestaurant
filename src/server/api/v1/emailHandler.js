// emailHandler.js
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import process from 'process';

dotenv.config();

const emailHandler = (app) => {
    app.post('/api/send-email', async (req, res) => {
        console.log("RECEIVED POST REQUEST", req.body);

        console.log(process.env.EMAIL_USER); // Should log the email user
        console.log(process.env.EMAIL_PASSWORD); // Should log the email password
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
            to: 'akaashkasi@gmail.com',
            subject: `New message from ${req.body.name}`,
            text: `You received a new message from ${req.body.email} (Phone: ${req.body.phone}): ${req.body.message}`,
        };

        try {
            await transporter.sendMail(mailOptions);
            res.json({ message: 'Email sent successfully' });
        } catch (error) {
            console.error('Error sending email:', error);
            res.status(500).send('Error sending email');
        }
    });
};

export default emailHandler;
