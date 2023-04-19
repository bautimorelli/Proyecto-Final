import passport from "passport"
import { authPassport } from "../auth/passport.js"
import { transporter } from "../config/messages/email.js"
import { logger } from "../services/logger/logger.js"

authPassport(passport)

class AuthController {
	static postLoginPassport = passport.authenticate("loginStrategy", {
		failureRedirect: "/error",
		failureMessage: true,
	})

	static postSignupPassport = passport.authenticate("signupStrategy", {
		failureRedirect: "/error",
		failureMessage: true,
	})

	static postLogin(req, res) {
		if (req.isAuthenticated()) {
			res.status(200).json({
				status: "SUCCESS",
				message: "Usuario Autenticado",
			})
		}
	}

	static postSignup(req, res) {
		sendNewUserEmail(req)
		res.status(200).json({
			status: "SUCCESS",
			message: "Usuario Registrado y Autenticado",
		})
	}

	static authError(req, res) {
		res.status(400).json({
			status: "ERROR",
			message: req.session.messages.pop(),
		})
	}

	static logout(req, res) {
		req.logOut((error) => {
			if (error) {
				res.status(400).json({
					status: "ERROR",
					message: "No se pudo cerrar la session",
				})
			}
			res.status(200).json({
				status: "SUCCESS",
				message: "La sesion ha sido cerrada",
			})
		})
	}
}

async function sendNewUserEmail(req) {
	try {
		const user = {
			email: req.body.email,
			name: req.body.name,
			address: req.body.address,
			age: req.body.age,
			phoneNumber: req.body.phoneNumber,
			pictureURL: req.body.pictureURL,
		}

		const emailTemplate = JSON.stringify(user, null, 2)

		const mailOptions = {
			from: "Servidor app Node",
			to: process.env.NODEMAILER_EMAIL,
			subject: "Nuevo Registro",
			html: emailTemplate,
		}

		await transporter.sendMail(mailOptions)
	} catch (error) {
		logger.error("Error al enviar mail de usuario nuevo")
	}
}

export { AuthController }
