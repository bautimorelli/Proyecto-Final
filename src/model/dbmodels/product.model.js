import mongoose from "mongoose"

const productCollection = "products"

const productSchema = new mongoose.Schema({
	name: {
		type: String,
		require: true,
	},
	price: {
		type: Number,
		require: true,
	},
	thumbnail: {
		type: String,
		require: true,
	},
	description: {
		type: String,
	},
	date: {
		type: String,
	},
	stock: {
		type: Number,
	},
})

export const ProductModel = mongoose.model(productCollection, productSchema)
