const Joi = require("joi");

class userInterface {
    static get login() {
        return  Joi.object().keys({
            "Username" : Joi.string().min(1).required(),
            "Password" : Joi.string().min(1).required()
        })
    };

    static get TokenCheckSchema() {
        return Joi.object().keys({
            "token": Joi.string().required()
        })
    };

    static get TokenRefreshSchema() {
        return Joi.object().keys({
            "token": Joi.string().required(),
            "refreshToken": Joi.string().required()
        })
    };

    static get signUp() {
        return  Joi.object().keys({
            "Username" : Joi.string().min(1).required(),
            "Password" : Joi.string().min(1).required(),
            "Name" : Joi.string().min(1).required(),
            "Lastname"  :Joi.string().min(1).required()
        })
    };

    static get signUpChat() {
        return  Joi.object().keys({
            "Text" : Joi.string().min(1).required(),
            "DestinationId" : Joi.number().min(1).required(),
        })
    };

    static get limitAndOffset() {
        return  Joi.object().keys({
            "limit" : Joi.number().required(),
            "offset" : Joi.number().required(),
        })
    };

    static get resetPassword() {
        return  Joi.object().keys({
            "Username" : Joi.string().min(1).required(),
            "NewPassword" : Joi.string().min(1).required()
        })
    };

}

module.exports = userInterface;