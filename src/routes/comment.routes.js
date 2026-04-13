import { Router } from "express";
import { createComment,deleteComment,fetchComments,showComment } from "../controllers/comment.controller.js";

const router = Router();

router.post("/create", createComment);
router.delete("/delete/:id", deleteComment);
router.get("/show/:id", showComment);
router.get("/all", fetchComments);
export default router;
