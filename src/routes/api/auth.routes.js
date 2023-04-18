import express from "express"
import { AuthController } from "../../controllers/auth.controller.js"

const router = express.Router()

router.post("/login", AuthController.postLoginPassport, AuthController.postLogin)

router.post("/register", AuthController.postSignupPassport, AuthController.postSignup)

router.get("/error", AuthController.authError)

router.post("/logout", AuthController.logout)

export { router as authRouter }
