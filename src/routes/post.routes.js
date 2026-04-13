import { Router } from "express";
import { createPost, fetchPosts, updatePost, deletePost, showPost } from "../controllers/post.controller.js";

const router = Router();

router.post("/createPost", createPost);
router.get("/allPosts", fetchPosts);
router.put("/update/:id", updatePost);
router.delete("/delete/:id", deletePost);
router.get("/show/:id", showPost);

export default router;