const mongoose = require('mongoose');
const validator = require('validator');


const CartItemSchema = new mongoose.Schema({
    cartID: {
        type: String,
        required: [true, 'Please provide item ID']
    },
    productID: {
        type:String,
        required:[true, 'Please provide product ID']
    },
    image: {
        type: String,
        required: [true, 'Please provide image']
    },
    title:{
        type:String,
        required:[true,'Please provide title'],
    },
    company:{
        type:String,
        required:[true,'Please provide company'],
    },
    price:{
        type:Number,
        required:[true,'Please provide price']
    },
    amount:{
        type:Number
    },
    productColor:{
        type:String
    }
});
const OrderSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please provide name'],
    },
    address:{
        type:String,
        required:[true,'Please provide address'],
    },
    chargeTotal:{
        type:Number,
        required:[true,'Please provide chargeTotal']
    },
    orderTotal:{
        type:String,
        required:[true,'Please provide orderTotal']
    },
    numItemsInCart:{
        type:Number,
        required:[true,'Please provide numOfItems']
    },
    userId:{
        type:String,
        required:[true,'Please provide userId']
    },
    cartItems:{
        type:[CartItemSchema],
        default:[]
    }
},{timestamps:true})



module.exports = mongoose.model('Order',OrderSchema)