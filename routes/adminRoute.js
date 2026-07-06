import express from "express"

import adminController from "../controllers/adminController.js"
import protect from "../middleware/authMiddleware.js"

const router=express.Router()

router.get("/",protect.forAdmin,adminController.getUsers)
router.get("/:id",protect.forAdmin,adminController.getUser)
router.put("/:id",protect.forAdmin,adminController.updateUsers)
router.delete("/:id",protect.forAdmin,adminController.removeUsers)

export default router