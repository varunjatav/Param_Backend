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
      const { email, phoneNo ,payment } = req.body;
     console.log(email, phoneNo ,payment);
      // Validate request body
      if (!email || !phoneNo) {
        return res.status(400).json({ message: "Email and phone number are required" });
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
        await sendMail(req.body, "Mail Regards Contact of Students");
        await sendMailUser(req.body, "Mail Regards Contact", "Thank you for contacting us!");
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


/*
curl --request POST \
     --url https://sandbox.cashfree.com/pg/orders \
     --header 'accept: application/json' \
     --header 'content-type: application/json' \
     --header 'x-api-version: 2023-08-01' \
     --header 'x-client-id: TEST102460268052e16f5bad020b244d62064201' \
     --header 'x-client-secret: cfsk_ma_test_7ba52560b6c5b34eab7f4edfbb08b2c0_537a25de' \
     --data '
{
  "customer_details": {
    "customer_id": "12589",
    "customer_email": "test@gmail.com",
    "customer_phone": "9874561238",
    "customer_name": "Code Sense"
  },
  "order_meta": {
    "payment_methods": "cc,dc,upi",
    "notify_url": "https://webhook.site/1b87125d-ff6e-453a-8e09-b317b73758ff"
  },
  "order_id": "452323",
  "order_amount": 2000,
  "order_currency": "INR",
  "order_note": "First Test Order"
}
'
*/ 