import Student from "../models/student.js";
import { sendMail, sendMailUser } from "../mail.js";
const studentController = async (req,res) => {
  try {
    if (req.body) {
        const student = new Student(req.body);
        const doc = await student.save();
        res.status(201).json(doc);
        await sendMail(req.body, "Mail Regards Contact of Students");
        await sendMailUser(req.body, "Mail Regards Contact", "Thank you for contacting us!");
       console.log(req.body);
    }
  } catch (error) {
    res.send(error.message);
  }
};

export default studentController;
