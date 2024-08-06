import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import studentRouter from "./routes/student.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

const app = express();
const PORT = 3001;
dotenv.config();

app.use(cors());
app.use(bodyParser.json());
mongoose.connect(process.env.MONGODB)

app.use("/registration",studentRouter);
app.get("/registration", (req,res)=>{
  res.send("Welcome");
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
