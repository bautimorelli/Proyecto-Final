import express from "express"
import { AuthController } from "../../controllers/auth.controller.js"
import { routeLogger } from "../../services/middleware/routeLogger.js"

const router = express.Router()

router.get("/login", routeLogger, (req, res) => {
	res.render("login")
})

router.get("/register", routeLogger, (req, res) => {
	res.render("register")
})

router.post("/login", AuthController.postLoginPassport,routeLogger,AuthController.postLogin)

router.post("/register", AuthController.postSignupPassport, routeLogger ,AuthController.postSignup)

router.get("/error", routeLogger, AuthController.authError)

router.get("/logout", routeLogger, AuthController.logout)

export { router as authRouter }
