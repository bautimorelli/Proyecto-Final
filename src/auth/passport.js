import bcrypt from "bcrypt"
import { Strategy as LocalStrategy } from "passport-local"
import { UserModel } from "../model/dbmodels/user.model.js"

const authPassport = (passport) => {
	passport.serializeUser((user, done) => {
		return done(null, user.id)
	})
	passport.deserializeUser(async (id, done) => {
		try {
			let userFound = await UserModel.findById(id)
			return done(null, userFound)
		} catch (err) {
			return done(err, null)
		}
	})

	passport.use(
		"signupStrategy",
		new LocalStrategy(
			{
				passReqToCallback: true,
				usernameField: "email",
			},
			async (req, username, password, done) => {
				try {
					let userFound = await UserModel.findOne({ email: username })
					if (userFound)
						return done(null, false, {
							message: "El usuario ya existe",
						})
					const newUser = {
						name: req.body.name,
						phoneNumber: req.body.phoneNumber,
						email: username,
						password: bcrypt.hashSync(password, 10, null),
					}
					let userCreated = await UserModel.create(newUser)
					return done(null, userCreated)
				} catch (err) {
					if (err) return done(err)
				}
			}
		)
	)

	passport.use(
		"loginStrategy",
		new LocalStrategy(
			{
				usernameField: "email",
			},
			async (username, password, done) => {
				try {
					let user = await UserModel.findOne({ email: username })
					if (!user)
						return done(null, false, {
							message: "Usuario con ese nombre no existe",
						})
					if (!bcrypt.compareSync(password, user.password))
						return done(null, false, {
							message: "Contraseña invalida",
						})
					return done(null, user)
				} catch (err) {
					if (err) return done(err)
				}
			}
		)
	)
}

export { authPassport }
