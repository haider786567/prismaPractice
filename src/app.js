import express from "express";
import authRoutes from "./routes/auth.routes.js";
import postRoutes from "./routes/post.routes.js";
import commentRoutes from "./routes/comment.routes.js";
const app = express();
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Prisma API");
});

export default app;