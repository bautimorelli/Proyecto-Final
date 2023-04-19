import mongoose from "mongoose"

class MyMongoClient {
	constructor() {
		this.client = mongoose
	}

	async connect(url) {
		try {
			await this.client.set("strictQuery", false)
			await this.client.connect(url, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
			})
		} catch (error) {
			throw new Error(
				"Error al conectar la base de datos de Mongo",
				error
			)
		}
	}

}

export { MyMongoClient }
