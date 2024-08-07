import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import studentRouter from "./routes/student.js";
import dotenv from "dotenv";
import mongoose from "mongoose";


dotenv.config();
const app = express();
const port = 3001;


app.use(cors());
app.use(bodyParser.json());


mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Connection error', error);
});

app.use("/registration",studentRouter);
app.get("/", (req, res) => {
    res.send("Welcome to server!!")
})
app.get("/registration", (req,res)=>{
  res.send("Welcome to registration");
})

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
