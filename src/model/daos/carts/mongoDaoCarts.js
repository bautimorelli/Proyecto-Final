import { MongoManager } from "../../managers/mongo.manager.js"

class MongoDAOCarts extends MongoManager {
	constructor(model) {
		super(model)
	}
}

export { MongoDAOCarts }
