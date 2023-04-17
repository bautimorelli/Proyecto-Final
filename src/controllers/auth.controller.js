import passport from "passport"
import { authPassport } from "../auth/passport.js"

authPassport(passport)

class AuthController{

    static postLoginPassport = passport.authenticate("loginStrategy", {
		failureRedirect: "/error",
		failureMessage: true,
	})

    static postSignupPassport = passport.authenticate("signupStrategy", {
		failureRedirect: "/error",
		failureMessage: true,
	})

    static postLogin(req, res){
        if (req.isAuthenticated()) {
			console.log("usuario logeado")
			res.redirect("home")
		}
    }

    static postSignup(req, res){
        res.redirect("/home")
    }

    static authError(req, res){
        res.render("error", { message: req.session.messages.pop() })
    }

    static logout(req, res){
        const user = req.user
        req.session.destroy((error) => {
            if (error) return res.send("Hubo un error al cerrar la sesion")
            res.render("logout", { user })
        })
    }

}

export {AuthController}