const { StatusCodes } = require("http-status-codes");
const CustomApiError = require("./custom_error_base");

class UnAuthenticatedRequest extends CustomApiError{
    constructor(message){
        super(message)
        this.statusCode = StatusCodes.UnAuthenticatedRequest;
    }
}

module.exports =  UnAuthenticatedRequest;