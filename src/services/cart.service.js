import { formatedDate } from "../util.js"
import { CartManager } from "../model/index.js"

class CartService {
	static async getCarts() {
		return await CartManager.getAll()
	}

	static async saveCart(ownerId) {
		const cart = {
			owner_id: ownerId,
			date: formatedDate(),
			items: [],
		}
		return await CartManager.save(cart)
	}

	static async updateCart(id, cart) {
		return await CartManager.updateById(id, cart)
	}

	static async deleteCart(id) {
		return await CartManager.deleteById(id)
	}

	static async getCartById(id) {
		return await CartManager.getById(id)
	}
}

export { CartService }
