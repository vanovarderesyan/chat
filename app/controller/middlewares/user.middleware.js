"use strict";

const Schema = require("../interfaces/user.interface");
const Interface = require("../../service/interface.service");


class userMW {
    static login(req, res, next) {
        req.checkInterface = Schema.login;
        req.checkObject = req.body;
        Interface.checker(req, next);
    };

    static tokenCheck(req, res, next) {
        req.checkInterface = Schema.TokenCheckSchema;
        req.checkObject = {
            token: req.headers.token
        };
        Interface.checker(req, next);
    };

    static tokenRefresh(req, res, next) {
        req.checkInterface = Schema.TokenRefreshSchema;
        req.checkObject = {
            token: req.headers.token,
            refreshToken: req.headers.refreshtoken
        };
        Interface.checker(req, next);
    };

    static signUp(req, res, next) {
        req.checkInterface = Schema.signUp;
        req.checkObject = req.body;
        Interface.checker(req, next);
    };

    static signUpChat(req, res, next) {
        req.checkInterface = Schema.signUpChat;
        req.checkObject = req.body;
        Interface.checker(req, next);
    };

    static limitAndOffset(req, res, next) {
        req.checkInterface = Schema.limitAndOffset;
        req.checkObject = req.params;
        Interface.checker(req, next);
    };

    static resetPassword(req, res, next) {
        req.checkInterface = Schema.resetPassword;
        req.checkObject = req.body;
        Interface.checker(req, next);
    };
}

module.exports = { userMW };