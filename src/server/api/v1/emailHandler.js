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
const emailHandler = app => {
  app.post('/api/send-email', async (req, res) => {
    console.log('RECEIVED POST REQUEST', req.body);
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

  app.post('/api/send-confirmation', async (req, res) => {
    console.log('RECEIVED POST REQUEST', req.body);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const {
      name,
      orderDetails,
      orderTime,
      orderNumber,
      paymentType,
      totalPrice,
      confirmationMethod,
    } = req.body;

    // Email content for the restaurant
    const restaurantEmailSubject = `Order Number ${orderNumber} from ${name}`;
    const restaurantEmailBody = `You received a new order from ${name}:\nOrder Details: ${orderDetails}\nOrder Time: ${orderTime}\nOrder Number: ${orderNumber}\nPayment Type: ${paymentType}\nTotal Price: ${totalPrice}`;

    // Email content for the customer
    const customerEmailSubject = `Your Order Confirmation - ${orderNumber}`;
    const customerEmailBody = `Hello ${name},\nThank you for your order!\nOrder Details: ${orderDetails}\nOrder Time: ${orderTime}\nOrder Number: ${orderNumber}\nPayment Type: ${paymentType}\nTotal Price: ${totalPrice}`;

    try {
      // Send email to the restaurant
      const restaurantMailOptions = {
        from: process.env.EMAIL_USER,
        to: 'yums.chinese.collierville@gmail.com',
        subject: restaurantEmailSubject,
        text: restaurantEmailBody,
      };
      await transporter.sendMail(restaurantMailOptions);

      // Send email or SMS to the customer
      if (confirmationMethod.includes('@')) {
        // If confirmation method is an email, send an email to the customer
        console.log('Sending email to customer');
        const customerMailOptions = {
          from: process.env.EMAIL_USER,
          to: confirmationMethod, // Customer's email
          subject: customerEmailSubject,
          text: customerEmailBody,
        };
        await transporter.sendMail(customerMailOptions);
      } else {
        // If confirmation method is a phone number, send an SMS
        console.log('Sending SMS to customer');
        const params = {
          Message: `Hello ${name}, thank you for your order! Your Order Number is ${orderNumber}.`,
          PhoneNumber: confirmationMethod,
        };
        await sns.publish(params).promise();
      }

      res.send({ status: 'Confirmation sent' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Error occurred while sending email or SMS');
    }
  });
};

export default emailHandler;
