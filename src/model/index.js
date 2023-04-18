import { CartModel } from "./dbmodels/cart.model.js"
import { ProductModel } from "./dbmodels/product.model.js"
import { MyMongoClient } from "./clients/dbClientMongo.js"
import firebaseInit from "./clients/dbClientFirebase.js"
import { options } from "../config/dbConfig.js"
import { MongoManager } from "./managers/mongo.manager.js"
import { UserModel } from "./dbmodels/user.model.js"

const myClient = new MyMongoClient()
await myClient.connect(options.mongo.urlMainDatabase)
console.log("Base de datos de Mongo conectada")

const dbType = options.server.DB_TYPE

const UserManager = new MongoManager(UserModel)
let CartManager
let ProductManager
switch (dbType) {
    case "mongo":
        const { MongoDAOCarts } = await import(
            "./daos/carts/mongoDaoCarts.js"
        )
        const { MongoDAOProducts } = await import(
            "./daos/products/mongoDaoProducts.js"
        )
        CartManager = new MongoDAOCarts(CartModel)
        ProductManager = new MongoDAOProducts(ProductModel)
        break
    case "firebase":
        firebaseInit(options.firebase.urlMainDatabase)
        const { FirebaseDAOCarts } = await import(
            "./daos/carts/firebaseDaoCarts.js"
        )
        const { FirebaseDAOProducts } = await import(
            "./daos/products/firebaseDaoProducts.js"
        )
        CartManager = new FirebaseDAOCarts("carts")
        ProductManager = new FirebaseDAOProducts("products")
        break
    case "file":
        const { FileDAOCarts } = await import(
            "./daos/carts/fileDaoCarts.js"
        )
        const { FileDAOProducts } = await import(
            "./daos/products/fileDaoProducts.js"
        )
        CartManager = new FileDAOCarts("carts")
        ProductManager = new FileDAOProducts("products")
        break
    case "memory":
        const { MemoryDAOCarts } = await import(
            "./daos/carts/memoryDaoCarts.js"
        )
        const { MemoryDAOProducts } = await import(
            "./daos/products/memoryDaoProducts.js"
        )
        CartManager = new MemoryDAOCarts()
        ProductManager = new MemoryDAOProducts()
        break
    default:
        break
}

export { UserManager, CartManager, ProductManager }

