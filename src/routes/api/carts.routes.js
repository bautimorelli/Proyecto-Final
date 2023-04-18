import express from "express"
import { CartController } from "../../controllers/cart.controller.js"

const router = express.Router()

router.get("/", CartController.getCarts)

router.post("/", CartController.saveCart)

router.get("/:id", CartController.getCartById)

router.delete("/:id", CartController.deleteCart)

router.get("/:id/products", CartController.getProductsFromCartId)

router.post("/:id/products/:id_prod", CartController.addProductToCart)

router.delete("/:id/products/:id_prod", CartController.deleteProductFromCart)

router.post("/:id/checkout", CartController.checkout)

export { router as cartRouter }
