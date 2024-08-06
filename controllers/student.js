import Student from "../models/student.js";
import { sendMail, sendMailUser } from "../mail.js";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';


const studentController = async (req,res) => {

  try {
    const order_id = `order_${uuidv4()}`;
    if (req.body) {
      const response = await axios.post('https://test.cashfree.com/api/v1/order/create', {
        // Replace with actual request payload
        order_id: order_id,
        order_amount: 100, // Example amount
        customer_email: req.body.email,
        customer_phone: req.body.phoneNO,
        return_url: `https://test.cashfree.com/pgappsdemos/return.php?order_id=${order_id}`,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.APP_ID,
          'x-api-secret': process.env.SECRET_KEY
        }
      });
      console.log("response data: ",response.data);
  
      const paymentSessionId = response.data.paymentSessionId;
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
