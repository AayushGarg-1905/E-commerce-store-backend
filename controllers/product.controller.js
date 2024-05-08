const CommonUtils = require('../utils/commonUtils')
const CustomError = require('../errors');
const {Product, ProductCategories, ProductCompanies} = require('../models/Product');
const { StatusCodes } = require('http-status-codes');

const getAllProducts = async(req,res)=>{
    const params = req.query;
    
    const {featured, company, search, category, price, shipping, lastFetchedProductId,direction,firstFetchedProductId} = params;

    if(featured!==undefined){
        const products = await Product.find().limit(3);
        res.status(StatusCodes.OK).json({msg:'Featured products fetched successfully',data:products});
        return;
    }

    const pageSize = 9;

    let productsFilterQuery = {};
    if(company){
        productsFilterQuery.company = company;
    }
    if(search){
        productsFilterQuery.title = search;
    }
    if(category){
        productsFilterQuery.category = category;
    }
    if(shipping!==undefined){
        productsFilterQuery.freeShipping = shipping;
    }
    if(price){
        productsFilterQuery = {
            ...productsFilterQuery,
            price:{$lt: price}
        }
    }

    if(lastFetchedProductId ){
        productsFilterQuery = {
            ...productsFilterQuery,
            _id:{$lt: lastFetchedProductId}
        }
    }
    if(firstFetchedProductId){
        productsFilterQuery = {
            ...productsFilterQuery,
            _id:{$gt: firstFetchedProductId}
        }
    }

    let isLastPage = false;

    let products = [];
    if(firstFetchedProductId!==undefined){
        products = await Product.find(productsFilterQuery).sort({_id:1}).limit(pageSize);
        products = products.reverse();
    }
    else{
        products = await Product.find(productsFilterQuery).sort({_id:-1}).limit(pageSize);
    }
    if (products.length < pageSize) {
        isLastPage = true;
    }
    const productsData = {
        products,
        lastFetchedProductId: products[products.length - 1]._id,
        firstFetchedProductId: products[0]._id,
        isLastPage
    }

    res.status(StatusCodes.OK).json({msg:'Products fetched Successfully',data:productsData});
}   

const getSingleProduct = async(req,res)=>{
    const params = req.params;
    const {productId} = params;
    const product = await Product.findOne({_id: productId});
    if(!product){
        throw new CustomError.BadRequestError(`No product found with id ${productId}`);
    }
    res.status(StatusCodes.OK).json({msg:'Single product fetched successfully',data:product});
}

const getProductFilters = async(req,res)=>{
    res.status(StatusCodes.OK).json({msg:'Filters fetched successfully',data:{ProductCategories, ProductCompanies}})
}

module.exports = {
    getAllProducts,
    getSingleProduct,
    getProductFilters
}