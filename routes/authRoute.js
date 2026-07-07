import express from "express"
import authController from "../controllers/authController.js"
import validation from "../middleware/validationMiddleware.js"

const router=express.Router()

router.post("/register",validation.registervalidation, authController.register)
router.post("/login",validation.loginValidation,authController.login)
router.post("/refresh",authController.refreshToken)
export default router