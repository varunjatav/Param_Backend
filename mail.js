import nodemailer from "nodemailer";
// Mail sending functions
export const sendMail = async (data, subject, text) => {
  console.log(subject);
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "mohit.mohit979@gmail.com",
          pass: "qxkt ovze ootk pysd",
        },
      });
    
      const mailOptions = {
        from: data.email,
        to: "mohit.mohit979@gmail.com , paramcomputers.jhs@gmail.com",
        subject,
        text,
      };
    
      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent: " + info.response);
    } catch (error) {
      console.error(error);
    }
  };
  
  export const sendMailUser = async (data, subject, text) => {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "mohit.mohit979@gmail.com",
          pass: "qxkt ovze ootk pysd",
        },
      });
    
      const mailOptions = {
        from: "mohit.mohit979@gmail.com",
        to: data.email,
        subject,
        text,
      };
    
      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent: " + info.response);
    } catch (error) {
      console.error(error);
    }
  };

//   export default {
//     sendMail,
//     sendMailUser
//   }