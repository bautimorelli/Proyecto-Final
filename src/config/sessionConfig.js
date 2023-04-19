import session from "express-session"
import MongoStore from "connect-mongo"
import { options } from "./dbConfig.js"

export default session({
	store: MongoStore.create({
		mongoUrl: options.mongo.urlSessionDatabase,
		ttl: 600,
	}),
	secret: options.mongo.sessionHash,
	resave: false,
	saveUninitialized: false,
})
