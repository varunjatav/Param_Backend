import nodemailer from "nodemailer";


// Mail sending functions
export const sendMail = async (data, subject, text) => {
 
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.AUTH_USER,
          pass: process.env.AUTH_PASS,
        },
      });
   
      const mailOptions = {
        from: data.email,
        to: "mohit.mohit979@gmail.com , paramcomputers.jhs@gmail.com",
        subject,
        text: `Student name is ${data.name}\nhis/her email is ${data.email}\nhis/her contact number is ${data.phoneNo}.\nThe course he/she selected is ${data.course} from ${data.section} \nFrom: ${data.name}`,
      };
    
      const info = await transporter.sendMail(mailOptions);
      // console.log("Email sent: " + info.response);
    } catch (error) {
      console.error(error);
    }
  };
  
  export const sendMailUser = async (data, subject, text) => {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.AUTH_USER,
          pass: process.env.AUTH_PASS,
        },
      });
    
      const mailOptions = {
        from: "mohit.mohit979@gmail.com",
        to: data.email,
        subject,
        text,
      };
    
      const info = await transporter.sendMail(mailOptions);
      // console.log("Email sent: " + info.response);
    } catch (error) {
      console.error(error);
    }
  };
