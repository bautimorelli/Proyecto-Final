import { ProductManager } from "../model/index.js"
import { formatedDate } from "../util.js"

class ProductService {
	static async getProducts() {
		return await ProductManager.getAll()
	}

	static async saveProduct(body) {
		body.date = formatedDate()
		return await ProductManager.save(body)
	}

	static async updateProduct(id, body) {
		return await ProductManager.updateById(id, body)
	}

	static async deleteProduct(id) {
		return await ProductManager.deleteById(id)
	}

	static async getProductById(id) {
		return await ProductManager.getById(id)
	}
}

export { ProductService }
