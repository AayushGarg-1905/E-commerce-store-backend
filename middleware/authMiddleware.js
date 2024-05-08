const CustomError = require('../errors');
const User = require('../models/User');

const authMiddleware = async(req,res,next)=>{
    const authorization = req.headers['authorization'];
    if(!authorization){
        throw new CustomError.UnAuthorizedError('user not authorized');
    }

    const accessToken = authorization.split(' ')[1];
    const userFilterQuery = {accessToken};

    const user = await User.findOne(userFilterQuery);
    if(!user){
        throw new CustomError.UnAuthorizedError('user not authorized');
    }

    req.userId = user._id;
    next();
}

module.exports = authMiddleware