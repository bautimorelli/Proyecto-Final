import express from "express"
import passport from "passport"
import __dirname from "./util.js"
import cluster from "cluster"
import os from "os"
import { Server } from "socket.io"
import session from "./config/sessionConfig.js"
import { ProductService } from "./services/product.service.js"
import { MessageService } from "./services/message.service.js"
import { apiRouter } from "./routes/index.js"
import { options } from "./config/dbConfig.js"

//.....Config Argumentos
const PORT = options.server.PORT
const MODE = options.server.MODE

//.....Express server
const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(__dirname + "/views/public"))

//....Template engine
app.set("views", __dirname + "/views")
app.set("view engine", "ejs")

//.....Session config
app.use(session)

//.....Passport
app.use(passport.initialize())
app.use(passport.session())

//.....Routes
app.use(apiRouter)

//Logica Cluster
if (MODE === "CLUSTER" && cluster.isPrimary) {
	const cpuAmount = os.cpus().length
	console.log(`Cantidad de nucleos: ${cpuAmount}`)
	for (let index = 0; index < cpuAmount; index++) {
		cluster.fork()
	}
	cluster.on("exit", (worker) => {
		console.log(`El proceso ${worker.process.pid} ha dejado de funcionar`)
		cluster.fork()
	})
} else {
	//Express Server
	const server = app.listen(PORT, () =>
    console.log(`http://localhost:${PORT} - Server listening on port ${PORT} on process ${process.pid}`)
	)
}

export {app}