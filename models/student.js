import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    name: String,
    email: String,
    phoneNo: String,
    course: String,
    section:String,
});

export default mongoose.model("Student", studentSchema);  