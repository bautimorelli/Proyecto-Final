import { getApi } from "../model/index.js";

const {MessageManager} = await getApi()

class MessageService {
    static async getMessages(){
        return await MessageManager.getAll();
    }

    static async saveMessage(body){
        return await MessageManager.save(body)
    }
}

export {MessageService}