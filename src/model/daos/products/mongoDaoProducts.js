import { MongoManager } from "../../managers/mongo.manager.js"
class MongoDAOProducts extends MongoManager {
	constructor(model) {
		super(model)
	}
}

export { MongoDAOProducts }
