import { getApi } from "../model/index.js";

const {UserManager} = await getApi()

class UserService{
    static async getUsers(){
        return await UserManager.getAll();
    }

    static async saveUser(body){
        return await UserManager.save(body)
    }

    static async getUser(id){
        return await UserManager.getById(id)
    }
};

export {UserService}