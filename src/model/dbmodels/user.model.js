import mongoose from "mongoose"

const userCollection = "users"

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		require: true,
	},
	password: {
		type: String,
		require: true,
	},
	name: {
		type: String,
		require: true,
	},
	address: {
		type: String,
		require: true,
	},
	age: {
		type: Number,
		require: true,
	},
	phoneNumber: {
		type: String,
		require: true,
	},
	avatar: {
		type: String,
		require: true,
	},
})

export const UserModel = mongoose.model(userCollection, userSchema)
