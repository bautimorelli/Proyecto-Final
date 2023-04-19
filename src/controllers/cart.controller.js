import { transporter } from "../config/messages/email.js"
import { twilioClient } from "../config/messages/whatsapp.js"
import { convertProductToDto } from "../model/dtos/product.dto.js"
import { CartService } from "../services/cart.service.js"
import { logger } from "../services/logger/logger.js"
import { ProductService } from "../services/product.service.js"
import { UserService } from "../services/user.service.js"

class CartController {
	static async getCarts(req, res) {
		try {
			const carts = await CartService.getCarts()
			res.status(200).json({
				status: "SUCCESS",
				data: carts,
			})
		} catch (error) {
			res.status(400).json({
				status: "ERROR",
				message: `Hubo un error ${error}`,
			})
		}
	}

	static async saveCart(req, res) {
		try {
			const owner_id = req.user._id
			const response = await CartService.saveCart(owner_id.toString())
			res.status(200).json({
				status: "SUCCESS",
				data: response,
			})
		} catch (error) {
			res.status(400).json({
				status: "ERROR",
				message: `Hubo un error ${error}`,
			})
		}
	}

	static async deleteCart(req, res) {
		try {
			const response = await CartService.deleteCart(req.params.id)
			res.status(200).json({
				status: "SUCCESS",
				data: response,
			})
		} catch (error) {
			res.status(400).json({
				status: "ERROR",
				message: `Hubo un error ${error}`,
			})
		}
	}

	static async getCartById(req, res) {
		try {
			const response = await CartService.getCartById(req.params.id)
			res.status(200).json({
				status: "SUCCESS",
				data: response,
			})
		} catch (error) {
			res.status(400).json({
				status: "ERROR",
				message: `Hubo un error ${error}`,
			})
		}
	}

	static async getProductsFromCartId(req, res) {
		try {
			const cart = await CartService.getCartById(req.params.id)
			const response = cart.items
			res.status(200).json({
				status: "SUCCESS",
				data: response,
			})
		} catch (error) {
			res.status(400).json({
				status: "ERROR",
				message: `Hubo un error ${error}`,
			})
		}
	}

	static async addProductToCart(req, res) {
		try {
			const cart = await CartService.getCartById(req.params.id)
			const product = await ProductService.getProductById(
				req.params.id_prod
			)
			product.id = req.params.id_prod
			const productDto = convertProductToDto(product)
			cart.items.push({...productDto})
			const response = await CartService.updateCart(req.params.id, cart)
			res.status(200).json({
				status: "SUCCESS",
				data: response,
			})
		} catch (error) {
			res.status(400).json({
				status: "ERROR",
				message: `Hubo un error ${error}`,
			})
		}
	}

	static async deleteProductFromCart(req, res) {
		try {
			const cart = await CartService.getCartById(req.params.id)
			cart.items = cart.items.filter(
				(item) => item.product_id != req.params.id_prod
			)
			const response = await CartService.updateCart(req.params.id, cart)
			res.status(200).json({
				status: "SUCCESS",
				data: response,
			})
		} catch (error) {
			res.status(400).json({
				status: "ERROR",
				message: `Hubo un error ${error}`,
			})
		}
	}

	static async checkout(req, res) {
		try {
			const cart = await CartService.getCartById(req.params.id)
			if (cart == null) {
				res.json({ error: `carrito con id ${req.params.id} no existe` })
				return
			}
			//sendCheckoutNotificactions(req, cart)
			await CartService.deleteCart(req.params.id)
			res.status(200).json({
				status: "SUCCESS",
				message: `se creó el pedido exitosamente`,
			})
		} catch (error) {
			res.status(400).json({
				status: "ERROR",
				message: `Hubo un error ${error}`,
			})
		}
	}
}

async function sendCheckoutNotificactions(req, cart) {
	try {
		const emailTemplate = JSON.stringify(cart, null, 2)

		const mailOptions = {
			from: "Servidor app Node",
			to: process.env.NODEMAILER_EMAIL,
			subject: `Nuevo Pedido del usuario ${req.user.email}`,
			html: emailTemplate,
		}
		await transporter.sendMail(mailOptions)


		const user = await UserService.getUserById(cart.owner_id)
		await twilioClient.messages.create({
			from: process.env.TWILIO_PHONENUMBER,
			to: process.env.ADMIN_PHONENUMBER,
			body: `Nuevo Pedido de ${req.user.name} desde el usuario ${req.user.email}`,
		})

		await twilioClient.messages.create({
			from: process.env.TWILIO_PHONENUMBER,
			to: user.phoneNumber,
			body: `Hemos recibido su pedido y ya se encuentra en proceso! Muchas Gracias`,
		})
	} catch (error) {
		logger.error("Error al enviar notificacion de checkout")
	}
	
}

export { CartController }
