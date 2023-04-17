export const routeLogger = (req, res, next) => {
    console.log(`Accedida la ruta ${req.route.path} mediante el metodo ${req.route.stack[0].method}`)
    next()
}
