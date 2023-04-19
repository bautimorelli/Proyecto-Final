
class MongoManager {
	constructor(model) {
		this.model = model
	}

	async getAll() {
		try {
			let objects = await this.model.find()
			return objects
		} catch (error) {
			throw new Error("Error al conseguir los objetos de mongo", error)
		}
	}

	async save(object) {
		try {
			const response = await this.model.create(object)
			return response
		} catch (error) {
			throw new Error("Error al guardar", error)
		}
	}

	async getById(id) {
		try {
			const response = await this.model.findById(id)
			return response
		} catch (error) {
			throw new Error("Error al conseguir por id", error)
		}
	}

	async deleteById(id) {
		try {
			await this.model.findByIdAndDelete(id)
			return "delete successfully"
		} catch (error) {
			throw new Error("Error al borrar por id", error)
		}
	}

	async deleteAll() {
		try {
			await this.model.delete({})
			return "delete successfully"
		} catch (error) {
			throw new Error("Error al borrar todos", error)
		}
	}

	async updateById(id, object) {
		try {
			const response = await this.model.findByIdAndUpdate(id, object, {
				new: true,
			})
			return response
		} catch (error) {
			throw new Error("Error al actualizar por id", error)
		}
	}
}

export { MongoManager }
