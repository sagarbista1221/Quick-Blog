import express from "express";
import { getAllSubscribers } from "../controllers/subscriberController.js";

const router = express.Router();

router.get("/", getAllSubscribers); // GET all subscribers

export default router;
