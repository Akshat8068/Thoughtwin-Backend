import express from "express"
import userController from "../controllers/userController.js"
import protect from "../middleware/authMiddleware.js"


const router=express.Router()

router.get("/",protect.forAuthUser, userController.getUsers)
router.get("/:id",protect.forAuthUser,userController.getUser)

export default router