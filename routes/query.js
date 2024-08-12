import express from "express";
import queryController from "../controllers/query.js";

const router = express.Router();

router.post("/query", queryController);

export default router;