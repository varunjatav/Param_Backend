import Student from "../models/registration.js";

const studentController = async (req,res) => {
  try {
    if (req.body) {
        const student = new Student(req.body);
        const doc = await student.save();
        res.status(201).json(doc);
      console.log(req.body);
    }
  } catch (error) {
    res.send(error.message);
  }
};

export default studentController;
