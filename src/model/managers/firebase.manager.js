import admin from "firebase-admin"

const db = admin.firestore()

class FirebaseManager {
	constructor(nameCollection) {
		this.collection = db.collection(nameCollection)
	}

	async getAll() {
		try {
			const querySnapshot = await this.collection.get()
			let docs = querySnapshot.docs
			let objects = docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}))
			return objects
		} catch (error) {
			throw new Error("Error al conseguir los objetos de firebase", error)
		}
	}

	async save(object) {
		try {
			let doc = this.collection.doc()
			await doc.create(object)
			return doc.id
		} catch (error) {
			throw new Error("Error al guardar", error)
		}
	}

	async getById(id) {
		try {
			const doc = this.collection.doc(id)
			const item = await doc.get()
			const response = item.data()
			return response
		} catch (error) {
			throw new Error("Error al conseguir por id", error)
		}
	}

	async deleteById(id) {
		try {
			const doc = this.collection.doc(id)
			await doc.delete()
			return "delete successfully"
		} catch (error) {
			throw new Error("Error al borrar por id", error)
		}
	}

	async deleteAll() {
		try {
			const doc = this.collection.doc()
			await doc.delete()
			return "delete successfully"
		} catch (error) {
			throw new Error("Error al borrar todos", error)
		}
	}

	async updateById(id, object) {
		try {
			const doc = this.collection.doc(id)
			const response = await doc.update(object)
			return response
		} catch (error) {
			throw new Error("Error al actualizar por id", error)
		}
	}
}

export { FirebaseManager }
