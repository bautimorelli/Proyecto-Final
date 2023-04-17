import express from "express";
import { MessageController } from "../../controllers/message.controller.js";

const router = express.Router();

router.get("/", MessageController.getMessages);
router.post("/", MessageController.saveMessage);

export {router as messageRouter};