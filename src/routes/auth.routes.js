import { Router } from "express";
import { registerUser,updateUser,getUser,deleteUser,getAllUsers} from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", registerUser);
router.put("/update/:id", updateUser);
router.get("/get/:id", getUser);
router.delete("/delete/:id", deleteUser);
router.get("/allUsers", getAllUsers);
export default router;
