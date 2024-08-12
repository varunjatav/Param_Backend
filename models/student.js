import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    name: String,
    email: String,
    phoneNo: String,
    mode: String,
    course: String,
    section: String,
    payment: Number
});

export default mongoose.model("Student", studentSchema);  