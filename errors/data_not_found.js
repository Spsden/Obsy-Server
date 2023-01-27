const CustomApiError = require("./custom_error_base");
const StatusCode = require("http-status-codes");

class DataNotFound extends CustomApiError{
    constructor(message){
        super(message)
        this.statusCode = StatusCode.NOT_FOUND
    }
}

module.exports = DataNotFound;