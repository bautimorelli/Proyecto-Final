import { UserModel } from "./dbmodels/user.model.js"
import { ProductModel } from "./dbmodels/product.model.js"
import { MessageModel } from "./dbmodels/message.model.js"
import { CartModel } from "./dbmodels/cart.model.js"
import { OrderModel } from "./dbmodels/order.model.js"
import { MongoManager } from "./managers/mongo.manager.js"
import { MyMongoClient } from "./clients/dbClientMongo.js"
import { options } from "../config/dbConfig.js"

// export async function getApi(){

//     const myClient = new MyMongoClient()
//     await myClient.connect(options.mongo.urlMainDatabase)

//     const UserManager = new MongoManager(UserModel)
//     const ProductManager = new MongoManager(ProductModel)
//     const MessageManager = new MongoManager(MessageModel)
//     const CartManager = new MongoManager(CartModel)
//     const OrderManager = new MongoManager(OrderModel)

//     return {UserManager, ProductManager, MessageManager, CartManager, OrderManager}
// }

export async function getApiDao(dbType){
    let UserManager
    let ProductManager
    let MessageManager
    switch (dbType) {
        case "mongo":
            const {UserMongoDao} = await import("./daos/users/mongoDaoUsers.js");
            const {ProductMongoDao} = await import("./daos/products/productMongoDao.js");
            const {MessageMongoDao} = await import("./daos/messages/mongoDaoMessages.js");
            //Connect database
            const myClient = new MyMongoClient()
            await myClient.connect(options.mongo.urlMainDatabase)
            UserManager = new UserMongoDao(UserModel)
            ProductManager = new ProductMongoDao(ProductModel)
            MessageManager = new MessageMongoDao(MessageModel)
            break;
        default:
            break;
    }
    return {UserManager, ProductManager, MessageManager}
}