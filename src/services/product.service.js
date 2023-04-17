import { getApi } from "../model/index.js";

const {ProductManager} = await getApi()

class ProductService {
    static async getProducts(){
        return await ProductManager.getAll();
    }

    static async saveProduct(body){
        return await ProductManager.save(body)
    }

    static async updateProduct(id, body){
        return await ProductManager.updateById(id, body)
    }

    static async deleteProduct(id){
        return await ProductManager.deleteById(id)
    }

    static async getProductById(id){
        return await ProductManager.getById(id)
    }

    // static async getProductDto(){
    //     const products = await ProductManager.getAll();
    //     const productsDto = convertProductToDto(products)
    //     return productsDto
    // }
}

export {ProductService}