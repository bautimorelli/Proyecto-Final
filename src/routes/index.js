import express from "express"
import { authRouter } from "./api/auth.routes.js"
import { userRouter } from "./api/user.routes.js"
import { productRouter } from "./api/product.routes.js"
import { messageRouter } from "./api/message.routes.js"
import { routeLogger } from "../services/middleware/routeLogger.js"
import { authLogin } from "../services/middleware/authLogin.js"

const router = express.Router()

router.get("/home", authLogin, routeLogger, (req, res) => {
	res.render("home", { user: req.user })
})

router.get("/", routeLogger, (req, res) => {
	res.redirect("/home")
})

router.use("", authRouter)
router.use("/user", userRouter)
router.use("/product", productRouter)
router.use("/message", messageRouter)

export { router as apiRouter}