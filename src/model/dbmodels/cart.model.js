import mongoose from "mongoose"

const cartCollection = "carts"

const itemSchema = new mongoose.Schema({
	product_id: {
		type: String,
	},
	name: {
		type: String,
	},
	thumbnail: {
		type: String,
	},
	price: {
		type: Number,
	},
})

const cartSchema = new mongoose.Schema({
	date: {
		type: String,
		require: true,
	},
	owner_id: {
		type: String,
		require: true,
	},
	items: {
		type: [itemSchema],
		require: true,
	},
})

export const CartModel = mongoose.model(cartCollection, cartSchema)
