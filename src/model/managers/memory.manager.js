class MemoryManager {
	constructor() {
		this.productos = []
	}

	getAll() {
		return this.productos
	}

	save(producto) {
		const id = this.productos.length + 1
		producto.id = id
		this.productos.push(producto)
		return `Saved sucessfully with id ${id}`
	}

	getById(id) {
		let producto = this.productos.find((element) => element.id == id)
		if (producto == undefined) {
			throw new Error(
				"Error al conseguir por id: id de producto no existe"
			)
		}
		return producto
	}

	deleteById(id) {
		const result = this.productos.filter((element) => element.id != id)
		//Reordeno los id
		if (result.length > 0) {
			let count = 1
			result.forEach((element) => {
				element.id = count
				count++
			})
		}
		this.productos = result
		return "delete successfully"
	}

	deleteAll() {
		this.productos = []
		return "delete successfully"
	}

	updateById(id, object) {
		let index = this.productos.findIndex((element) => element.id == id)
		if (index == -1) {
			throw new Error(
				"Error al actualizar por id: id de producto no existe"
			)
		}
		object.id = id
		this.productos[index] = object
		return { msg: "updated succesfully" }
	}
}

export { MemoryManager }
