import express from "express"
import { authRouter } from "./api/auth.routes.js"
import { productRouter } from "./api/product.routes.js"
import { cartRouter } from "./api/carts.routes.js"
import { checkUserLogged } from "../services/middleware/loggedAuth.js"

const router = express.Router()

router.use("", authRouter)
router.use("/products", checkUserLogged, productRouter)
router.use("/carts", checkUserLogged, cartRouter)

router.use((req, res, next) => {
	res.status(404).json({
		status: "NOT FOUND",
		message: `ruta ${req.url} con el metodo ${req.method} no implementado`,
	})
})

export { router as apiRouter }
