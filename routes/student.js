import express from "express";

import studentController from "../controllers/student.js"
import verifyCredentials from "../controllers/verifyCredentials.js"

const router = express.Router();

router.post('/' , studentController);

export default router;