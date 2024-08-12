import express from "express";

import studentController from "../controllers/student.js"


const router = express.Router();

router.post('/registration' , studentController);

export default router;