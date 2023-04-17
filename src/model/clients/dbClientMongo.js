import mongoose from "mongoose"

class MyMongoClient{
    constructor(){
        this.client = mongoose
    }

    async connect(url){
        try {
            await this.client.set("strictQuery", false)
            await this.client.connect(url,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
            console.log("Base de datos conectada")
        } catch (error) {
            throw new Error("Error al conectar la base de datos", error)
        }
    }

    async disconnect(){
        try {
            await this.client.connection.close()
            console.log("base de datos desconectada")
        } catch (error) {
            throw new Error("Error al desconectar la base de datos", error)
        }
    }
}

export {MyMongoClient}