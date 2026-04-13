import prisma from "../config/db.js";

export const createComment = async (req, res) => {
    try {
        const { userId, postId, comment } = req.body;
        const createComment = await prisma.comment.create({
        data: {
            userId,
            postId,
            comment,
        },
        });
        res.status(201).json({ message: "Comment created successfully", comment: createComment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};
export const fetchComments = async (req, res) => {
    try {
        const comments = await prisma.comment.findMany({
        include: {
            user: true,
            post: true,
        },
        });
        res.status(200).json({ comments });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch comments" });
    }
};
export const showComment = async(req,res)=>{
    try {
        const { id } = req.params;
        const comment = await prisma.comment.findUnique({
        where: { id: id },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
        },
        });
        if (comment) {
        res.status(200).json({ comment });
        } else {
        res.status(404).json({ error: "Comment not found" });
        }
    } catch (error) {
        console.log(error.message);
        
        res.status(500).json({ error: error.message });
    }
};

export const deleteComment = async(req,res)=>{
    try {
        const { id } = req.params;
        await prisma.comment.delete({
        where: { id: parseInt(id) },
        });
        res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete comment" });
    }
}   