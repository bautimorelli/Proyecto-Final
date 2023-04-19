import { logger } from "../logger/logger.js"

export const routeLogger = (req, res, next) => {
	logger.info(`Accedida la ruta ${req.url} mediante el metodo ${req.method}`)
	next()
}
