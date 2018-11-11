const express = require('express');
const { userController: Controller } = require("../../controller/controllers/user.controller");
const { userMW: MW } = require("../../controller/middlewares/user.middleware");
const router = express.Router();




//swagger
const userSwagger = require("./user.swagger");

//user router
userSwagger.login;
router.post('/login', MW.login, Controller.login);
router.post('/reset', MW.resetPassword, Controller.resetPassword);


userSwagger.checkToken;
router.get('/check/token', MW.tokenCheck, Controller.checkTokenIsExpired);

userSwagger.refreshToken;
router.get('/refresh/token', MW.tokenRefresh, Controller.getNewJwtToken);

router.post('/',MW.signUp,Controller.signUp);

router.use(Controller.checkToken);

router.post('/chat',MW.signUpChat,Controller.signUpChat);

router.get('/',Controller.getAlluser);

router.get('/chat/:limit/:offset',MW.limitAndOffset ,Controller.getAllChat);
router.get('/count/chat',Controller.getAllChatCount);







module.exports = router;
