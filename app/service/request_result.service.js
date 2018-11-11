'use strict'

class RequestResultService{
    static create(statusCode, message){
        return {
            statusCode,
            data : {
                message
            }
        }
    };
}

module.exports.RequestResultService = RequestResultService;