const Joi = require("joi");

class Interface {
    static checker(req, next) {
        const _interface = req.checkInterface;
        const object = req.checkObject;
        Joi.validate(object, _interface, (err, value) => {
            if(err) {
                err = err.toString()
                err = err.slice('Error:'.length + 1);
                next(new Error(err));
            }else{
                next();
            }
        })
    };
};

module.exports = Interface;