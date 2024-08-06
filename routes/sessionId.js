import express from "express";

import SessionController from "../controllers/student.js"

const router = express.Router();

router.post('/',SessionController);

export default router;