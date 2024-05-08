const mongoose = require('mongoose');
const validator = require('validator');

const ProductSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,'Please provide title'],
    },
    company:{
        type:String,
        required:[true,'Please provide company'],
    },
    description:{
        type:String,
        required:[true,'Please provide description']
    },
    category:{
        type:String,
        required:[true,'Please provide category']
    },
    image:{
        type:String,
        required:[true,'Please provide image']
    },
    price:{
        type:Number,
        required:[true,'Please provide price']
    },
    freeShipping:{
        type:Boolean,
    },
    colors:{
        type:Array
    }
})

const ProductCategories = ["Tables",
"Chairs",
"Kids",
"Sofas",
"Beds"
] 

const ProductCompanies = [
    "Modenza",
    "Luxora",
    "Artifex",
    "Comfora",
    "Homestead"
]

module.exports = {Product: mongoose.model('Product',ProductSchema), ProductCategories, ProductCompanies }