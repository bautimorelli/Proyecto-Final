import { MongoManager } from "../../managers/mongo.manager.js";

class UserMongoDao extends MongoManager{
    constructor(model){ // new UserMongoDao(model)
        super(model); // remplazar new MongoContainer(model)
    }
}

export {UserMongoDao}