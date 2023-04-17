import { MessageService } from "../services/message.service.js";


class MessageController{

    static async getMessages(req,res){
        try {
            const users = await MessageService.getMessages();
            res.status(200).json({
                status:"SUCCESS",
                data:users
            });
        } catch (error) {
            res.status(400).json({
                status:"ERROR",
                message:`Hubo un error ${error}`
            });
        }
    };

    static async saveMessage(req,res){
        try {
            const response = await MessageService.saveMessage(req.body);
            res.status(200).json({
                status:"SUCCESS",
                data: response
            });
        } catch (error) {
            res.status(400).json({
                status:"ERROR",
                message:`Hubo un error ${error}`
            });
        }
    };
}

export {MessageController}