"use strict";
const { userDao: dao } = require("../../dao/user.dao");
const authService = require("../../service/authentication.service");

class userController {
	signUp(req, res) {
        req.body.Password =authService.hash(req.body.Password);
        dao.signUp(req.body).then((result) => {
            res.status(result.statusCode).json(result.data);
        }).catch((err) => {
            res.status(err.statusCode).json(err);
        })
	};

	signUpChat(req, res) {
		req.body.SourceId = req.decodedToken.id;
		console.log(req.body,'-------------')
        dao.signUpChat(req.body).then((result) => {
            res.status(result.statusCode).json(result.data);
        }).catch((err) => {
            res.status(err.statusCode).json(err);
        })
	};

	resetPassword(req, res) {
        req.body.NewPassword =authService.hash(req.body.NewPassword);
        dao.resetPassword(req.body).then((result) => {
            res.status(result.statusCode).json(result.data);
        }).catch((err) => {
            res.status(err.statusCode).json(err);
        })
	};

	getAlluser(req, res) {
		let id = req.decodedToken.id;
        dao.getAlluser(id).then((result) => {
            res.status(result.statusCode).json(result.data);
        }).catch((err) => {
            res.status(err.statusCode).json(err);
        })
	};

	getAllChatCount(req, res) {
		let id = req.decodedToken.id;
        dao.getAllChatCount(id).then((result) => {
            res.status(result.statusCode).json(result.data);
        }).catch((err) => {
            res.status(err.statusCode).json(err);
        })
	};

	getAllChat(req, res) {
		let id = req.decodedToken.id;
		let data = {
			id: id,
			limit : req.params.limit,
			offset : req.params.offset
		}
        dao.getAllChat(data).then((result) => {
            res.status(result.statusCode).json(result.data);
        }).catch((err) => {
            res.status(err.statusCode).json(err);
        })
	};
	
	login(req, res) {
		const username = req.body.Username;
		const password = authService.hash(req.body.Password.toString());

		if (!username.trim() && !password.trim()) {
			return res.status(400).send("Password and username are required");
		}

		dao.getLoggeduser(username, password).then((user) => {
			const tokenObject = { id: user.id, username: user.username };
			const token = authService.jwtSign(tokenObject);
			const sendingData = {
				token,
				refreshToken: user.refreshToken
			};

			return res.status(200).json(sendingData);
		}).catch((err) => {
			res.sendStatus(404);
		})
	};

	checkTokenIsExpired(req, res) {
		const token = req.headers.token;
		authService.jwtVerify(token).then(() => {
			res.sendStatus(200);
		}).catch(error => {
			res.status(401).json(error);
		})
	};

	checkToken(req, res, next) {
		const token = req.headers.token;
		authService.jwtVerify(token).then(decodedToken => {
			req.decodedToken = { id: decodedToken.id };
			next()
		}).catch(error => {
			return res.status(401).json(error);
		})
	};

	getNewJwtToken(req, res) {
		const refreshToken = req.headers.refreshtoken;
		const token = req.headers.token;
		if (!token || !refreshToken) {
			return res.sendStatus(400);
		}
		authService.jwtVerify(token).then(() => {
			return res.status(200);
		}).catch((err) => {
			if (err.name === "TokenExpiredError") {
				dao.getuser(refreshToken).then((user) => {
					const jwtToken = authService.jwtSign({ Id: user.Id, Username: user.Username });
					return res.status(200).json({ token: jwtToken, refreshToken })
				}).catch((err) => {
					return res.sendStatus(err);
				})
			} else {
				return res.status(500).send("jwt error")
			}
		});
	};
}

module.exports.userController = new userController();

