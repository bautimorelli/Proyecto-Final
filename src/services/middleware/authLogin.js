export const authLogin = (req, res, next) => {
    req.user ? next() : res.redirect("/login")
}
