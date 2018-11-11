'use strict'

class userSwagger {
    static get login() {
        return `/**
        * @swagger
        * /user/login:
        *   post:
        *     tags:
        *      - user
        *     description: Login to the application
        *     produces:
        *       - application/json
        *     parameters:
        *       - name: Username
        *         description: Username to use for login.
        *         in: formData
        *         required: true
        *         type: string
        *       - name: Password
        *         description: User's password.
        *         in: formData
        *         required: true
        *         type: string
        *     responses:
        *       200:
        *         description: users
        *         example : 
        *           token: string
        *           refreshToken : string 
        */`
    };

    static get reset() {
        return `/**
        * @swagger
        * /user/reset:
        *   post:
        *     tags:
        *      - user
        *     description: reset
        *     produces:
        *       - application/json
        *     parameters:
        *       - name: body
        *         description: body to use for reset.
        *         in: body
        *         required: true
        *         type: string
        *         example : {"Username":string,"NewPassword":string}
        *     responses:
        *       200:
        *         description: users
        *         example : 
        *           token: string
        *           refreshToken : string 
        */`
    };

    static get signUp() {
        return `/**
        * @swagger
        * /user:
        *   post:
        *     tags:
        *      - user
        *     description: signup
        *     produces:
        *       - application/json
        *     parameters:
        *       - name: body
        *         description: body to use for signup.
        *         in: body
        *         required: true
        *         type: string
        *         example : {"Name":string,"Lastname" : string,"Username":string,"Password":string}
        *     responses:
        *       200:
        *         description: users
        *         example : 
        *           token: string
        *           refreshToken : string 
        */`
    };


    static get signUpChat() {
        return `/**
        * @swagger
        * /user/chat:
        *   post:
        *     tags:
        *      - user
        *     description: signup
        *     produces:
        *       - application/json
        *     parameters:
        *       - name: token
        *         description: Token for auth
        *         in:  headers
        *         required: true
        *         type: string
        *       - name: body
        *         description: body to use for signup.
        *         in: body
        *         required: true
        *         type: string
        *         example : {"Text":string,"DestinationId" : number}
        *     responses:
        *       200:
        *         description: users
        *         example : 
        *           token: string
        *           refreshToken : string 
        */`
    };


    static get checkToken() {
        return `/**
        * @swagger
        * /user/check/token:
        *   get:
        *     tags:
        *      - user
        *     description: Returns all users
        *     produces:
        *       - application/json
        *     parameters:
        *       - name: token
        *         description: Token for auth
        *         in:  headers
        *         required: true
        *         type: string
        *     responses:
        *       200:
        *         description : check_token serspons
        */`
    };

    static get refreshToken() {
        return `/**
        * @swagger
        * /user/refresh/token:
        *   get:
        *     tags:
        *      - user
        *     description: Returns all users
        *     produces:
        *       - application/json
        *     parameters:
        *       - name: token
        *         description: Token for auth
        *         in:  headers
        *         required: true
        *         type: string
        *       - name: refreshToken
        *         description: refreshToken for get new token
        *         in:  headers
        *         required: true
        *         type: string
        *     responses:
        *       200:
        *         description : check_token serspons
        */`
    };

    static get searchCompany() {
        return `/**
        * @swagger
        * /user:
        *   get:
        *     tags:
        *      - user
        *     description: get all user
        *     produces:
        *       - application/json
        *     parameters:
        *       - name: token
        *         description: Token for auth
        *         in:  headers
        *         required: true
        *         type: string
        *     responses:
        *       200:
        *         description : result =>    user    
        *         example : 
        *           message : array
        */`
    };

    static get searchCompany() {
        return `/**
        * @swagger
        * /user/count/chat:
        *   get:
        *     tags:
        *      - user
        *     description: count chat sms
        *     produces:
        *       - application/json
        *     parameters:
        *       - name: token
        *         description: Token for auth
        *         in:  headers
        *         required: true
        *         type: string
        *       - name: Name
        *     responses:
        *       200:
        *         description : count chat sms        
        *         example : 
        *           message : int
        */`
    };

    static get getAllChat() {
        return `/**
        * @swagger
        * /user/chat/:limit/:offset:
        *   get:
        *     tags:
        *      - user
        *     description: all user
        *     produces:
        *       - application/json
        *     parameters:
        *       - name: token
        *         description: Token for auth
        *         in:  headers
        *         required: true
        *         type: string
        *       - name: limit
        *         description: limit in params
        *         in:  params
        *         required: true
        *         type: number
        *       - name: offset
        *         description: offset in params
        *         in:  params
        *         required: true
        *         type: number
        *     responses:
        *       200:
        *         description : count user        
        *         example : 
        *           message : int
        */`
    };
}

module.exports = userSwagger;