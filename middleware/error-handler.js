const errorHandlerMiddleware = async (err, req, res, next) => {
    const customError = {
      statusCode: err.statusCode,
      msg:err.message
    }
    console.log(err)
    return res.status(customError.statusCode).json({ msg: customError.msg })
  }
  
  module.exports = errorHandlerMiddleware
  