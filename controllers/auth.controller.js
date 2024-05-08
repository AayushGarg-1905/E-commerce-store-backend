const CommonUtils = require('../utils/commonUtils')
const CustomError = require('../errors');
const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');

const register = async(req,res)=>{
    const params = req.body;
    const {username, email, password} = await validateRegister(params);
    const userDoc = {
        username, 
        email, 
        password: CommonUtils.hashPassword(password),
        accessToken: CommonUtils.getAccessToken()
    }
    const user = await User.create(userDoc);
    res.status(StatusCodes.OK).json({msg:'Registered Successfully',data:user});
}   

const login = async(req,res)=>{
    const params = req.body;
    const user = await validateLogin(params);

    const accessToken = CommonUtils.getAccessToken();
    const updateUserDoc = { accessToken }
    const userFilterQuery = { _id: user._id };
    await User.updateOne(userFilterQuery,updateUserDoc);
    const userData = {
        email:user.email,
        username:user.username,
        accessToken
    }
    res.json({msg:'Login successfully', data:userData});
}

const logout = async(req,res)=>{
    const userFilterQuery = {_id: req.userId};
    const accessToken = CommonUtils.getAccessToken();
    const updateUserDoc = { accessToken }
    await User.updateOne(userFilterQuery,updateUserDoc);
    res.json({msg:'Logout successfully'});
}

const validateRegister= async(params)=>{
    const { username, email, password } = params;
    if(!username || !email || !password){
        throw new CustomError.BadRequestError('please provide all credentials'); 
    }
    const userFilterQuery = {email};
    const user = await User.findOne(userFilterQuery);
    if(user){
        throw new CustomError.BadRequestError('User Already registered');
    }
    return { username, email, password };
}

const validateLogin = async(params)=>{
    const {email,password} = params;
    if(!email || !password){
        throw new CustomError.BadRequestError('please provide all credentials'); 
    }

    const userFilterQuery = {email};
    const user = await User.findOne(userFilterQuery);
    if(!user){
        throw new CustomError.BadRequestError('User not registered');
    }

    const hashedPassword = CommonUtils.hashPassword(password);
    if(hashedPassword !== user.password){
        throw new CustomError.BadRequestError('Incorrect Password');
    }
    return user;
}

module.exports = {
    register,
    login,
    logout
}