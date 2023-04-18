export const checkUserLogged = (req, res, next)=> {
    req.user ? next() : res.status(400).json({
        status:"ERROR",
        message: "Usuario no autenticado"
    }) 
}
