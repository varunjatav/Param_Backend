import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import studentRouter from "./routes/student.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

const app = express();
const port = process.env.PORT || 4000;
dotenv.config();

app.use(cors());
app.use(bodyParser.json());
mongoose.connect(process.env.MONGODB)

app.use("/registration",studentRouter);
app.get("/", (req, res) => {
    res.sendFile("Welcome to server!!")
})
app.get("/registration", (req,res)=>{
  res.send("Welcome tp registration");
})

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
