const { StatusCodes } = require("http-status-codes");
const Order = require("../models/Order");

const createOrder = async(req,res)=>{

    const { name, address, chargeTotal, orderTotal, cartItems, numItemsInCart } = req.body.data;
    const userId = req.userId;
    
    if(userId.toString() === process.env.TEST_USER_ID){
        res.status(StatusCodes.OK).json({msg:'Test user Cannot place new orders'});
        return;
    }
    const createOrderDoc = {
        name,
        address,
        chargeTotal,
        orderTotal,
        cartItems,
        numItemsInCart,
        userId
    }

    const order = await Order.create(createOrderDoc);

    res.status(StatusCodes.OK).json({msg:'Order Placed successfully'})
}

const getAllOrders = async(req,res)=>{

    const params = req.query;
    const {lastFetchedOrderId, firstFetchedOrderId} = params;
    let orderFilterQuery = {userId:req.userId};
    
    const pageSize = 5;
    if(lastFetchedOrderId ){
        orderFilterQuery = {
            ...orderFilterQuery,
            _id:{$lt: lastFetchedOrderId}
        }
    }
    if(firstFetchedOrderId){
        orderFilterQuery = {
            ...orderFilterQuery,
            _id:{$gt: firstFetchedOrderId}
        }
    }

    let orders = [];
    if(firstFetchedOrderId!==undefined){
        orders = await Order.find(orderFilterQuery).sort({_id:1}).limit(pageSize);
        orders = orders.reverse();
    }
    else{
        orders = await Order.find(orderFilterQuery).sort({_id:-1}).limit(pageSize);
    }

    let isLastPage = false;
    if (orders.length < pageSize) {
        isLastPage = true;
    }

    const ordersData = {
        orders,
        lastFetchedOrderId: orders[orders.length - 1]._id,
        firstFetchedOrderId: orders[0]._id,
        isLastPage
    }

    res.status(StatusCodes.OK).json({msg:'Orders Fetched successfully',data:ordersData});
}

module.exports = {
    createOrder,
    getAllOrders
}