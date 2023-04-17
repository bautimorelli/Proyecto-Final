import mongoose from "mongoose"

const cartCollection = "carts"

const itemSchema = new mongoose.Schema({
    name:{
        type:String
    },
    thumbnail:{
        type:String
    },
    amount:{
        type:Number
    }
})

const cartSchema = new mongoose.Schema({
    user:{
        type:String,
        require:true
    },
    date:{
        type:String,
        require:true
    },
    items:{
        type:[itemSchema],
        require:true
    },
    deliveryAddress:{
        type:String,
        require:true
    }
})

export const CartModel = mongoose.model(cartCollection,cartSchema)