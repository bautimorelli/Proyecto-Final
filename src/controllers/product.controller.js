import { ProductService } from "../services/product.service.js"

class ProductController {
	static async getProducts(req, res) {
		try {
			const products = await ProductService.getProducts()
			res.status(200).json({
				status: "SUCCESS",
				data: products,
			})
		} catch (error) {
			res.status(400).json({
				status: "ERROR",
				message: `Hubo un error ${error}`,
			})
		}
	}

	static async saveProduct(req, res) {
		try {
			const response = await ProductService.saveProduct(req.body)
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

	static async updateProduct(req, res) {
		try {
			const productDate = await ProductService.getProductById(
				req.params.id
			)
			req.body.date = productDate.date
			const response = await ProductService.updateProduct(
				req.params.id,
				req.body
			)
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

	static async deleteProduct(req, res) {
		try {
			const response = await ProductService.deleteProduct(req.params.id)
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

	static async getProductById(req, res) {
		try {
			const response = await ProductService.getProductById(req.params.id)
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
}

export { ProductController }
