const CustomApiError = require("./custom_error_base");
const StatusCode = require("http-status-codes");


class BadRequestError extends CustomApiError{
    constructor(message){
        super(message);
        this.statusCode = StatusCode.BadRequestError;
    }
}

module.exports = BadRequestError