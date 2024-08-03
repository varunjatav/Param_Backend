import express from "express";

import studentController from "../controllers/registration.js"

const router = express.Router();

router.post('/',studentController);

export default router;