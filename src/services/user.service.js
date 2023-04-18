import { UserManager } from "../model/index.js"

class UserService {
	static async getUserById(id) {
		return await UserManager.getById(id)
	}
}

export { UserService }
