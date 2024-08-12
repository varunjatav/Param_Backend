import mongoose from "mongoose";

const QuerySchema = mongoose.Schema({
  name: String,
  email: String,
  phoneNo: String,
  message: String,
});

export default mongoose.model('Query', QuerySchema);