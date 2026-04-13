import prisma from "../config/db.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(500).json({ error: "Failed to register user" });
  }
}

export const updateUser = async(req,res)=>{
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const user = await prisma.user.update({
      where: { id: parseInt(id) },
      data: {
        name,
        email,
        password,
      },
    });
    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(500).json({ error: "Failed to update user" });
  }
}
export const deleteUser = async(req,res)=>{
  try {
    const { id } = req.params;
    await prisma.user.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
}
export const getUser = async(req,res)=>{
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });
    if (user) {
      res.status(200).json({ user });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve user" });
  }
}
export const getAllUsers = async(req,res)=>{
  try{
    const users = await prisma.user.findMany();
    res.status(200).json({ users });  
  }catch(error){
    res.status(500).json({ error: "Failed to retrieve users" });
  }
}