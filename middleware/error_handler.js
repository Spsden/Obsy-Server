const CustomApiError = require("../errors/custom_error_base");

const errorHandler = (err,req,res,next)=> {
    if(err instanceof CustomApiError){
        return res.status(err.statusCode).json({msg:err.message})
    }

    return res.status(500).json({msg:'Something went wrong....'})

}

module.exports = errorHandler;