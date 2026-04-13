import prisma from "../config/db.js";

export const fetchPosts = async (req, res) => {
    try {
        const posts = await prisma.post.findMany({
        include: {
            user: true,
            comments: {
            include: {
                user: true,
            },
            },
        },
        });
        res.status(200).json({ posts });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch posts" });
    }
};

export const createPost = async (req, res) => {
    try {
        const { userId, title, description } = req.body;
        const post = await prisma.post.create({
        data: {
            userId,
            title,
            description,
        },
        });
        res.status(201).json({ message: "Post created successfully", post });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};  
export const showPost = async(req,res)=>{
    try {
        const { id } = req.params;
        const post = await prisma.post.findUnique({
        where: { id: parseInt(id) },
        include: {
            user: true,
            comments: {
            include: {
                user: true,
            },
            },
        },
        });
        if (post) {
        res.status(200).json({ post });
        } else {
        res.status(404).json({ error: "Post not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve post" });
    }
}   
export const deletePost = async(req,res)=>{
    try {
        const { id } = req.params;
        await prisma.post.delete({
        where: { id: parseInt(id) },
        });
        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete post" });
    }
}
export const updatePost = async(req,res)=>{
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        const post = await prisma.post.update({
        where: { id: parseInt(id) },
        data: {
            title,
            description,
        },
        });
        res.status(200).json({ message: "Post updated successfully", post });
    } catch (error) {
        res.status(500).json({ error: "Failed to update post" });
    }
}
