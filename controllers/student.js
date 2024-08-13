import Student from "../models/student.js";
import { sendMail, sendMailUser } from "../mail.js";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import dotenv from "dotenv";



dotenv.config();
console.log("APPID: ",process.env.APP_ID);
console.log("SECRET KEY: ",process.env.SECRET_KEY);
const studentController = async (req,res) => {

  try {
    const order_id = `order_${uuidv4()}`;
    if (req.body) {
      const { name, email, phoneNo , mode, course, section, payment  } = req.body;
      // Validate request body
      if (!name ||!email || !phoneNo ||!mode || !course || !section || !payment) {
        return res.status(400).json({ message: "Some Fields are Empty!!" });
      }
      const response = await axios.post('https://sandbox.cashfree.com/pg/orders', {
        customer_details: {
          customer_id: "7112AAA812234",
          customer_phone: phoneNo
        },
        order_currency: "INR",
        order_amount: payment
      }, {
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json',
          'x-api-version': '2023-08-01',
          'x-client-id': process.env.APP_ID,
          'x-client-secret': process.env.SECRET_KEY
        }
      });
      
  
      const paymentSessionId = response.data.payment_session_id;
   
        const student = new Student(req.body);
        const doc = await student.save();
        res.status(201).json({ ...doc.toObject(), paymentSessionId });
        await sendMail(req.body, "Mail Regards Registration of Students");
        await sendMailUser(req.body, "Mail Regards Registration to Param Computers", "Thank you for contacting us!");
      //  console.log(req.body);
    }
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Error Response Data:', error.response.data);
      console.error('Error Response Status:', error.response.status);
      console.error('Error Response Headers:', error.response.headers);
      res.status(error.response.status).send(error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Error Request Data:', error.request);
      res.status(500).send('No response received from server');
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error Message:', error.message);
      res.status(500).send('Error in setting up request');
    }
  }
};


export default studentController;


